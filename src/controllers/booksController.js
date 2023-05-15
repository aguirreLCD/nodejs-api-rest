import NotFound from "../errors/NotFound.js";
import { authors, books } from "../models/index.js";

class BookController {
  // list books
  static getBooks = async (req, res, next) => {
    try {
      const booksResponse = await books.find().populate("author").exec();
      res.status(200).json(booksResponse);
    } catch (err) {
      next(err);
      // console.log("getBooks catch err: ", err);
    }
  };

  // list books by ID
  static getBookById = async (req, res, next) => {
    const id = req.params.id;
    try {
      const searchedBook = await books
        .findById(id)
        .populate("author", "name")
        .exec();

      if (searchedBook !== null) {
        res.status(201).send(searchedBook);
      } else {
        next(
          new NotFound("Book identifier failed. Please check for valid id.")
        );
        // console.log("getBookById else err: ", err);
      }
    } catch (err) {
      next(err);
      // console.log("getBookById catch err: ", err);
    }
  };

  // register new book
  static createNewBook = async (req, res, next) => {
    try {
      let book = new books(req.body);
      const newBook = await book.save();
      res.status(201).send(newBook.toJSON());
    } catch (err) {
      next(err);
      // console.log("createNewBook catch err: ", err);
    }
  };

  // update book
  static updateBook = async (req, res, next) => {
    try {
      const id = req.params.id;

      const bookToUpdate = await books.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (bookToUpdate !== null) {
        res.status(201).send({ message: `Book ${id} updated.` });
      } else {
        next(new NotFound("Book to update not found."));
      }
    } catch (err) {
      next(err);
      // console.log("updateBook catch err: ", err);
    }
  };

  // delete book
  static deleteBook = async (req, res, next) => {
    try {
      const id = req.params.id;

      const bookToDelete = await books.findByIdAndDelete(id);

      if (bookToDelete !== null) {
        res.status(200).send({ message: `Book deleted.` });
      } else {
        next(new NotFound("Book to delete not found."));
      }
    } catch (err) {
      next(err);
      // console.log("deleteBook catch err: ", err);
    }
  };

  // refactoring to get books list by Filter
  static getBookByFilter = async (req, res, next) => {
    try {
      const searchForBook = await handleSearch(req.query);
      console.log("authorName::: ", req.query.authorName);

      if (searchForBook !== null) {
        const booksByFilter = await books
          .find(searchForBook)
          .populate("author");
        console.log("books by filter: ", booksByFilter);
        res.status(200).send(booksByFilter);
      } else {
        // res.status(200).send([]);
        next(new NotFound("Author not found"));
      }
    } catch (err) {
      next(err);
    }
  };
}

async function handleSearch(params) {
  const { publisher, title, minPages, maxPages, authorName } = params;

  let searchForBook = {};

  if (publisher) searchForBook.publisher = publisher;

  if (title) searchForBook.title = { $regex: title, $options: "i" };

  if (minPages || maxPages) searchForBook.printLength = {};

  // gte = greater than or equal to
  // if (minPages) searchForBook.printLength = { $gte: minPages };
  if (minPages) searchForBook.printLength.$gte = minPages;

  // lte = less than or equal to
  // if (maxPages) searchForBook.printLength = { $lte: maxPages };
  if (maxPages) searchForBook.printLength.$lte = maxPages;

  if (authorName) {
    const author = await authors.findOne({ name: authorName });

    console.log("author if ", author);
    console.log("authorName if ", authorName);

    if (author !== null) {
      const authorId = author._id;
      console.log("authorId ", authorId);

      searchForBook.author = authorId;
    } else {
      searchForBook = null;
    }
  }

  return searchForBook;
}

export default BookController;

import NotFound from "../errors/NotFound.js";
import { authors, books } from "../models/index.js";

class BookController {
  // list books
  static getBooks = async (req, res, next) => {
    try {
      const booksResponse = await books.find();
      res.status(200).json(booksResponse);
    } catch (err) {
      next(err);
    }
  };

  // list books by ID
  static getBookById = async (req, res, next) => {
    const id = req.params.id;
    try {
      const searchedBook = await books.findById(id);

      if (searchedBook !== null) {
        res.status(201).send(searchedBook);
        next(
          new NotFound("Book identifier failed. Please check for valid id.")
        );
      }
    } catch (err) {
      next(err);
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
    }
  };

  // refactoring to get books list by Filter
  static getBookByFilter = async (req, res, next) => {
    try {
      const searchForBook = await handleSearch(req.query);

      if (searchForBook !== null) {
        const booksByFilter = await books.find(searchForBook);
        res.status(200).send(booksByFilter);
      } else {
        res.status(200).send([]);
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
    console.log("author const inside handleSearch", author);
    console.log("author const inside handleSearch", author._id);
    console.log("author const inside handleSearch", author.name);
    console.log("author const inside handleSearch", author.language);
    if (author !== null) {
      searchForBook.author = author._id;
    } else {
      searchForBook = null;
    }
  }

  return searchForBook;
}

export default BookController;

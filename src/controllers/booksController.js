import NotFound from "../errors/NotFound.js";
import { books } from "../models/index.js";

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
      const { publisher, title } = req.query;

      // using js
      // const regex = new RegExp(title, "i");

      const searchForBook = {};

      if (publisher) searchForBook.publisher = publisher;
      // using mongoDB search operator
      if (title) searchForBook.title = { $regex: title, $options: "i" };

      const booksByFilter = await books.find(searchForBook).populate("author");

      if (booksByFilter.length !== 0) {
        res.status(200).send(booksByFilter);
      } else {
        next(new NotFound("Book not found"));
      }
    } catch (err) {
      next(err);
    }
  };
}

export default BookController;

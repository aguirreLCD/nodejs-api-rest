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

  // list books by Publisher
  static getBookByPublisher = async (req, res, next) => {
    try {
      const publisher = req.query;
      console.log("query", req.query);
      console.log("publisher", publisher);
      const booksByPublisher = await books.find(publisher).populate("author");

      if (booksByPublisher.length !== 0) {
        // console.log("books by publisher: ", booksByPublisher.length);
        res.status(200).send(booksByPublisher);
      } else {
        next(new NotFound("Publisher not found"));
      }
    } catch (err) {
      next(err);
      // console.log("getBookByPublisher catch err: ", err);
    }
  };
}

export default BookController;

import books from "../models/Book.js";

class BookController {
  // list books
  static getBooks = async (req, res, next) => {
    try {
      const booksResponse = await books.find().populate("author").exec();
      res.status(200).json(booksResponse);
    } catch (err) {
      console.log("getBooks catch err: ", err);
      next(err);
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
        console.log("getBookById else err: ", err);

        res.status(404).send({
          message: `${err} Book identifier failed. Please check for valid id.`,
        });
      }
    } catch (err) {
      console.log("getBookById catch err: ", err);
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
      console.log("createNewBook catch err: ", err);
      next(err);
    }
  };

  // update book
  static updateBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      await books.findByIdAndUpdate(id, { $set: req.body });
      res.status(201).send({ message: `Book ${id} updated.` });
    } catch (err) {
      console.log("updateBook catch err: ", err);
      next(err);
    }
  };

  // delete book
  static deleteBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      await books.findByIdAndDelete(id);
      res.status(200).send({ message: `Book deleted.` });
    } catch (err) {
      console.log("deleteBook catch err: ", err);
      next(err);
    }
  };

  // list books by Publisher
  static getBookByPublisher = async (req, res, next) => {
    try {
      const publisher = req.query;
      console.log("query", req.query);
      console.log("publisher", publisher);
      const booksByPublisher = await books.find(publisher).populate("author");

      if (booksByPublisher !== null) {
        res.status(200).send(booksByPublisher);
      } else {
        console.log("getBookByPublisher else err: ", err);
        res.status(400).send({
          message: `${err} Publisher identifier failed. Please check for valid id.`,
        });
      }
    } catch (err) {
      console.log("getBookByPublisher catch err: ", err);
      next(err);
    }
  };
}

export default BookController;

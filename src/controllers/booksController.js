import books from "../models/Book.js";

class BookController {
  // list books
  static getBooks = async (req, res) => {
    try {
      const booksResponse = await books.find().populate("author").exec();
      res.status(200).json(booksResponse);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // list books by ID
  static getBookById = async (req, res) => {
    const id = req.params.id;
    try {
      const searchedBook = await books
        .findById(id)
        .populate("author", "name")
        .exec();
      res.status(201).send(searchedBook);
    } catch (err) {
      res.status(400).send({
        message: `${err} Book identifier failed. Please check for valid id.`,
      });
    }
  };

  // register new book
  static createNewBook = async (req, res) => {
    try {
      let book = new books(req.body);
      const newBook = await book.save();
      res.status(201).send(newBook.toJSON());
    } catch (err) {
      res.status(500).send({
        message: `${err} Something went wrong. Book creation failed. Please check the required params.`,
      });
    }
  };

  // update book
  static updateBook = async (req, res) => {
    try {
      const id = req.params.id;
      await books.findByIdAndUpdate(id, { $set: req.body });
      res.status(201).send({ message: `Book ${id} updated.` });
    } catch (err) {
      res.status(500).send({
        message: `${err} Book validation failed. Please check the required params.`,
      });
    }
  };

  // delete book
  static deleteBook = async (req, res) => {
    try {
      const id = req.params.id;
      await books.findByIdAndDelete(id);
      res.status(200).send({ message: `Book deleted.` });
    } catch (err) {
      res.status(500).send({
        message: `${err} Book destruction failed. Please check the required params.`,
      });
    }
  };

  // list books by Publisher
  static getBookByPublisher = async (req, res) => {
    try {
      const publisher = req.query;
      console.log("query", req.query);
      console.log("publisher", publisher);
      const booksByPublisher = await books.find(publisher).populate("author");
      res.status(200).send(booksByPublisher);
    } catch (err) {
      res.status(400).send({
        message: `${err} Publisher identifier failed. Please check for valid id.`,
      });
    }
  };
}

export default BookController;

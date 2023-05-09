import books from "../models/Book.js";

class BookController {
  // list books
  static getBooks = async (req, res) => {
    try {
      const booksResponse = await books.find();
      res.status(200).json(booksResponse);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // list by ID books
  static getBookById = async (req, res) => {
    const id = req.params.id;
    try {
      let searchedBook = await books.findById(id);
      res.status(201).send(searchedBook.toJSON());
    } catch (err) {
      res.status(400).send({
        message: `${err} Book identifier failed. Please check for valid id.`,
      });
    }
  };

  // register new book
  static createNewBook = async (req, res) => {
    try {
      let book = await new books(req.body);
      book.save();
      res.status(201).send(book.toJSON());
    } catch (err) {
      res.status(500).send({
        message: `${err} Something went wrong. Book validation failed. Please check the required params.`,
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
}

export default BookController;
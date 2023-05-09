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

  // register new book
  static createNewBook = async (req, res) => {
    try {
      let book = await new books(req.body);
      book.save();
      res.status(201).send(book.toJSON());
    } catch (err) {
      res.status(500).send({ message: `${err} Something went wrong.` });
    }
  };
}

export default BookController;

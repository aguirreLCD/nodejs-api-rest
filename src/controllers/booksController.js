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
}

export default BookController;

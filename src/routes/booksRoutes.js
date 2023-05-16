import express from "express";

import BookController from "../controllers/booksController.js";
import handlingPagination from "../middleware/handlingPagination.js";

const router = express.Router();

router
  .get("/books", BookController.getBooks, handlingPagination)
  .get("/books/search", BookController.getBookByFilter, handlingPagination)
  .get("/books/:id", BookController.getBookById)
  .post("/books", BookController.createNewBook)
  .put("/books/:id", BookController.updateBook)
  .delete("/books/:id", BookController.deleteBook);

export default router;

import express from "express";

import BookController from "../controllers/booksController.js";

const router = express.Router();

router
  .get("/books", BookController.getBooks)
  .post("/books", BookController.createNewBook);

export default router;

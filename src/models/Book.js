import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  author: { type: String, required: true },
  printLength: { type: Number },
  publisher: { type: String, required: true },
});

const books = mongoose.model("books", bookSchema);

export default books;

import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: true,
  },
  printLength: { type: Number },
  publisher: { type: String, required: true },
});

const books = mongoose.model("books", bookSchema);

export default books;

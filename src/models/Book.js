import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: { type: String },
  title: {
    type: String,
    required: [true, "Book title is required"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: [true, "Author id is required"],
  },
  printLength: {
    type: Number,
    min: [
      10,
      "The number of pages must be between 10 and 5000. Input: {VALUE}",
    ],
    max: [
      5000,
      "The number of pages must be between 10 and 5000. Input: {VALUE}",
    ],
  },
  publisher: {
    type: String,
    required: [true, "Publisher is required"],
    enum: {
      values: ["Code house", "Alura"],
      message: "{VALUE} Publisher not allowed.",
    },
  },
});

const books = mongoose.model("books", bookSchema);

export default books;

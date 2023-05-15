import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

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
    autopopulate: { select: "name" },
  },
  printLength: {
    type: Number,
    validate: {
      validator: (inputValue) => {
        return inputValue >= 10 && inputValue <= 5000;
      },
      message:
        "The number of pages must be between 10 and 5000. Input value: {VALUE}",
    },
  },
  publisher: {
    type: String,
    required: [true, "Publisher is required"],
  },
});

bookSchema.plugin(autopopulate);
const books = mongoose.model("books", bookSchema);

export default books;

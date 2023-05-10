import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    language: { type: String },
  },
  {
    versionKey: false,
  }
);

const authors = mongoose.model("authors", authorSchema);

export default authors;

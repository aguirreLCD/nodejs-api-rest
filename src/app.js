import express from "express";
import db from "./config/dbConnect.js";
import books from "./models/Book.js";
import routes from "./routes/index.js";

db.once("open", () => {
  console.log("Your connection with mongodb atlas was successfully");
});

db.on("error", console.log.bind(console, "connection error"));

const app = express();

app.use(express.json());

routes(app);


// DELETE
// CRUD: Delete -> postman
app.delete("/books/:id", (req, res) => {
  // destructuring obj
  let { id } = req.params;
  let index = searchBook(id);
  books.splice(index, 1);
  res.send("Deleted book.");
});

function searchBook(id) {
  return books.findIndex((book) => book.id == id);
}

export default app;

import express from "express";
import db from "./config/dbConnect.js";
import books from "./models/Book.js";
import routes from "./routes/index.js";

db.once("open", () => {
  console.log("Your db connection was successfully");
});

db.on("error", console.log.bind(console, "connection error"));

const app = express();

app.use(express.json());

routes(app);

// CRUD: Search by id -> postman
app.get("/books/:id", (req, res) => {
  let index = searchBook(req.params.id);
  res.json(books[index]);
});

// POST
// CRUD: Create -> postman
app.post("/books", (req, res) => {
  books.push(req.body);
  res.status(201).send("Created book. Success! Yay!");
});

// PUT
// CRUD: Update -> postman
app.put("/books/:id", (req, res) => {
  let index = searchBook(req.params.id);
  books[index].title = req.body.title;
  res.json(books);
});

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

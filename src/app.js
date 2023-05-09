import express from "express";
import db from "./config/dbConnect.js";
import books from "./models/Book.js";

db.once("open", () => {
  console.log("Your db connection was successfully");
});

db.on("error", console.log.bind(console, "connection error"));

const app = express();

// data coming from postman,
// .json() = Returns middleware that only parses json
// and only looks at requests where the Content-Type header matches the type option
app.use(express.json());

// const books = [
//   {
//     id: 1,
//     title: "First book",
//   },
//   {
//     id: 2,
//     title: "Second book",
//   },
//   {
//     id: 3,
//     title: "Third book",
//   },
// ];

app.get("/", (req, res) => {
  res.status(200).send("Nodejs course");
});

// GET
// CRUD: Read
app.get("/books", async (req, res) => {
  try {
    const booksResponse = await books.find();
    res.status(200).json(booksResponse);
  } catch (err) {
    res.status(500).json(err);
  }
});

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

import express from "express";

const app = express();

const books = [
  {
    id: 1,
    title: "First book",
  },
  {
    id: 2,
    title: "Second book",
  },
  {
    id: 3,
    title: "Third book",
  },
];

app.get("/", (req, res) => {
  res.status(200).send("Nodejs course");
});

app.get("/books", (req, res) => {
  res.status(200).json(books);
});

export default app;

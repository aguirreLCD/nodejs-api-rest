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





export default app;

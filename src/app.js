import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import handlingErrors from "./middleware/handlingErrors.js";

db.once("open", () => {
  console.log("Your connection with mongodb atlas was successfully");
});
db.on("error", console.log.bind(console, "connection error"));

const app = express();
app.use(express.json());

routes(app);

app.use(handlingErrors);

export default app;

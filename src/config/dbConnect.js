import mongoose from "mongoose";

mongoose.connect(process.env.STRING_DB_CONNECTION);

let db = mongoose.connection;

export default db;

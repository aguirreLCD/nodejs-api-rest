import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://new_user1313:l4pcdszB6OKjiWDQ@clusteralura.djmfdzf.mongodb.net/alura-node"
);

let db = mongoose.connection;

export default db;

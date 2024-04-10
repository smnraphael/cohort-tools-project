const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI)
  .then((db) => console.log(`Connected to db: ${db.connections[0].name}`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

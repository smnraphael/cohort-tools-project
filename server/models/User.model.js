const { Schema, model } = require("mongoose");

// CREATE SCHEMA
const userSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
    name: { type: String },
  },
  { timestamps: true }
);

// CREATE MODEL
const User = model("User", userSchema);

// EXPORT THE MODEL
module.exports = User;

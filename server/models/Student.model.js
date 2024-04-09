const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: [String],
  program: String,
  background: String,
  image: String,
  cohort: Number,
  projects: Array,
});

// CREATE MODEL
const Student = mongoose.model("Student", studentSchema);

// EXPORT THE MODEL
module.exports = Student;

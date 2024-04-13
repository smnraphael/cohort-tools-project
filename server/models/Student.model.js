const { Schema, model } = require("mongoose");
const Cohort = require("./Cohort.model.js");

// CREATE SCHEMA
const studentSchema = new Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    phone: { type: String, require: true },
    linkedinUrl: { type: String, default: "" },
    languages: [
      {
        type: String,
        enum: [
          "English",
          "Spanish",
          "French",
          "German",
          "Portugues",
          "Dutch",
          "Other",
        ],
      },
    ],
    program: {
      type: String,
      enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
    },
    background: { type: String, default: "" },
    image: { type: String, default: "https://i.imgur.com/r8bo8u7.png" },
    cohort: { type: Schema.Types.ObjectId, ref: "Cohort" },
    projects: [],
  },
  { timestamps: true }
);

// CREATE MODEL
const Student = model("Student", studentSchema);

// EXPORT THE MODEL
module.exports = Student;

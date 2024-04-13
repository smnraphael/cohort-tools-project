const { Schema, model } = require("mongoose");

// CREATE SCHEMA
const cohortSchema = new Schema(
  {
    cohortSlug: { type: String, require: true },
    cohortName: { type: String, require: true },
    program: {
      type: String,
      enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
    },
    format: { type: String, enum: ["Full Time", "Part Time"] },
    campus: {
      type: String,
      enum: [
        "Madrid",
        "Barcelona",
        "Miami",
        "Paris",
        "Berlin",
        "Amsterdam",
        "Lisbon",
        "Remote",
      ],
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    inProgress: { type: Boolean, default: false },
    programManager: { type: String, require: true },
    leadTeacher: { type: String, require: true },
    totalHours: { type: Number, default: 360 },
  },
  { timestamp: true }
);

// CREATE MODEL
const Cohort = model("Cohort", cohortSchema);

// EXPORT THE MODEL
module.exports = Cohort;

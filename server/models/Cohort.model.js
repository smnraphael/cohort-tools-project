const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
const cohortSchema = new Schema({
  inProgress: Boolean,
  cohortSlug: String,
  cohortName: String,
  program: String,
  campus: String,
  startDate: Date,
  endDate: Date,
  programManager: String,
  leadTeacher: String,
  totalHours: Number,
});

// CREATE MODEL
const Cohort = mongoose.model("Cohort", cohortSchema);

// EXPORT THE MODEL
module.exports = Cohort;

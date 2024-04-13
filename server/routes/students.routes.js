const router = require("express").Router();
const Student = require("../models/Student.model");

// All the routes are prefixed with /api/students

router.get("/", async (req, res, next) => {
  try {
    let skip;
    let limit;
    if (req.query.limit !== undefined) {
      limit = Number(req.query.limit);
    }
    if (req.query.skip !== undefined) {
      skip = Number(req.query.skip);
    }
    const allStudents = await Student.find({})
      .limit(limit)
      .skip(skip)
      .populate("cohort");
    console.log("Retrieved cohorts ->", allStudents);
    res.json(allStudents);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).send(newStudent);
  } catch (error) {
    next(error);
  }
});

router.get("/cohort/:cohortId", async (req, res, next) => {
  try {
    const allStudents = await Student.find({
      cohort: req.params.cohortId,
    }).populate("cohort");
    res.json(allStudents);
  } catch (error) {
    next(error);
  }
});

router.get("/:studentId", async (req, res, next) => {
  try {
    const oneStudent = await Student.findOne({
      _id: req.params.studentId,
    }).populate("cohort");
    res.status(200).json(oneStudent);
  } catch (error) {
    next(error);
  }
});

router.put("/:studentId", async (req, res, next) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
});

router.delete("/:studentId", async (req, res, next) => {
  try {
    const studentToDelete = await Student.findByIdAndDelete(
      req.params.studentId
    );
    res.status(204).json(studentToDelete);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

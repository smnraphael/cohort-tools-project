const router = require("express").Router();
const Student = require("../models/Student.model");

// All the routes are prefixed with /api/students

router.get("/", async (req, res) => {
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
    console.error("Error while retrieving students ->", error);
    res.status(500).send({ error: "Failed to retrieve students" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).send(newStudent);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/cohort/:cohortId", async (req, res) => {
  try {
    const allStudents = await Student.find({
      cohort: req.params.cohortId,
    }).populate("cohort");
    res.json(allStudents);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/:studentId", async (req, res) => {
  try {
    const oneStudent = await Student.findOne({
      _id: req.params.studentId,
    }).populate("cohort");
    res.status(200).json(oneStudent);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/:studentId", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete("/:studentId", async (req, res) => {
  try {
    const studentToDelete = await Student.findByIdAndDelete(
      req.params.studentId
    );
    res.status(204).json(studentToDelete);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;

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
    const allStudents = await Student.find({}).limit(limit).skip(skip);
    console.log("Retrieved cohorts ->", allStudents);
    res.json(allStudents);
  } catch (error) {
    console.error("Error while retrieving students ->", error);
    res.status(500).send({ error: "Failed to retrieve students" });
  }
});

module.exports = router;

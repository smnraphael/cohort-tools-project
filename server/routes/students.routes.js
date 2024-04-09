const router = require("express").Router();
const students = require("../students.json");

// All the routes are prefixed with /api/students

router.get("/", (req, res) => {
  res.json(students);
});

module.exports = router;

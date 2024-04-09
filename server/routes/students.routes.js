const router = require("express").Router();
const Student = require("../models/Student.model");

// All the routes are prefixed with /api/students

router.get("/", (req, res) => {
  Student.find({})
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).send({ error: "Failed to retrieve students" });
    });
});

module.exports = router;

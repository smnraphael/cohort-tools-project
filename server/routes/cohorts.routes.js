const router = require("express").Router();
const Cohort = require("../models/Cohort.model");

// All the routes are prefixed with /api/cohorts

router.get("/", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).send({ error: "Failed to retrieve cohorts" });
    });
});

module.exports = router;

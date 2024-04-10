const router = require("express").Router();
const Cohort = require("../models/Cohort.model");

// All the routes are prefixed with /api/cohorts

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
    const allCohorts = await Cohort.find({}).limit(limit).skip(skip);
    console.log("Retrieved cohorts ->", allCohorts);
    res.json(allCohorts);
  } catch (error) {
    console.error("Error while retrieving cohorts ->", error);
    res.status(500).send({ error: "Failed to retrieve cohorts" });
  }
});

module.exports = router;

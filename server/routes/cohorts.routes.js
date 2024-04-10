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

router.post("/", async (req, res) => {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).send(newCohort);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/:cohortId", async (req, res) => {
  try {
    const oneCohort = await Cohort.findOne({ _id: req.params.cohortId });
    res.status(200).json(oneCohort);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/:cohortId", async (req, res) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCohort);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete("/:cohortId", async (req, res) => {
  try {
    const CohortToDelete = await Cohort.findByIdAndDelete(req.params.cohortId);
    res.status(204).json(CohortToDelete);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;

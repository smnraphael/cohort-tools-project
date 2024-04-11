const router = require("express").Router();
const Cohort = require("../models/Cohort.model");

// All the routes are prefixed with /api/cohorts

router.get("/", async (req, res, next) => {
  try {
    let skip;
    let limit;
    const campus = new RegExp(req.query.campus, "i");
    const program = new RegExp(req.query.program, "i");
    if (req.query.limit !== undefined) {
      limit = Number(req.query.limit);
    }
    if (req.query.skip !== undefined) {
      skip = Number(req.query.skip);
    }
    const allCohorts = await Cohort.find({ campus: campus, program: program })
      .limit(limit)
      .skip(skip);
    console.log("Retrieved cohorts ->", allCohorts);
    res.json(allCohorts);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).send(newCohort);
  } catch (error) {
    next(error);
  }
});

router.get("/:cohortId", async (req, res, next) => {
  try {
    const oneCohort = await Cohort.findOne({ _id: req.params.cohortId });
    res.status(200).json(oneCohort);
  } catch (error) {
    next(error);
  }
});

router.put("/:cohortId", async (req, res, next) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCohort);
  } catch (error) {
    next(error);
  }
});

router.delete("/:cohortId", async (req, res, next) => {
  try {
    const CohortToDelete = await Cohort.findByIdAndDelete(req.params.cohortId);
    res.status(204).json(CohortToDelete);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const router = require("express").Router();
const cohorts = require("../cohorts.json");

// All the routes are prefixed with /api/cohorts

router.get("/", (req, res) => {
  res.json(cohorts);
});

module.exports = router;

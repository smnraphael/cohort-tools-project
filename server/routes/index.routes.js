const router = require("express").Router();

router.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

router.get("/api/cohorts", require("./cohorts.routes"));

router.get("/api/students", require("./students.routes"));

module.exports = router;

const router = require("express").Router();

router.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

router.use("/api/auth", require("./auth.routes"));
router.use("/api/cohorts", require("./cohorts.routes"));
router.use("/api/students", require("./students.routes"));
router.use("/api/users", require("./users.routes.js"));

module.exports = router;

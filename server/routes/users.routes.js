const router = require("express").Router();
const User = require("../models/User.model.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");

router.use(isAuthenticated);

router.get("/:id", async (req, res, next) => {
  try {
    const oneUser = await User.findOne({ _id: req.params.id });
    res.status(200).json(oneUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

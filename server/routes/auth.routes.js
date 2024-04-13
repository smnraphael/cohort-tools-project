const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const SALT = 12;

// We are prefixed with /api/auth

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // const regex = new RegExp(
    //   "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6}$"
    // );
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "This email is already used." });
    }
    const hashedPassword = await bcrypt.hash(password, SALT);
    const createdUser = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: "Account created.", id: createdUser._id });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email }, { password: 1, email: 1 });
    if (!foundUser) {
      res.status(400).json({ message: "Wrong credentials" });
    }
    const correctPassword = await bcrypt.compare(password, foundUser.password);
    if (!correctPassword) {
      res.status(400).json({ message: "Wrong credentials" });
    }
    const token = jwt.sign({ id: foundUser._id }, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7 days",
    });
    res.json({ authToken: token });
  } catch (error) {
    next(error);
  }
});

router.get("/verify", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.currentUserId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const verify = require("../../verifyToken");
const { registerValidation, loginValidation } = require("../../validation");

// Register
router.post("/register", async (req, res) => {
  // Validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists!");

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create user with hashed password
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword
  });

  try {
    await user.save();

    // Successful registration leads to direct login
    // Create jwt token
    const userInfo = await User.findOne({ email: user.email });
    const token = jwt.sign({ _id: userInfo._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({ user: userInfo, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  // Validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send("No user has been registered with this email!");

  // Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password!");

  // Create jwt token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  console.log(user);
  res.header("auth-token", token).send({ user, token });
});

router.post("/token", verify, async (req, res) => {
  console.log(req.body);
  const userInfo = await User.findById(req.user._id, (err, doc) => {
    if (err) return res.status(404).send("Wrong token!");
    return doc;
  });
  res.send({ user: userInfo, token: req.body.token });
});

module.exports = router;

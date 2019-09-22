const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { registerValidation, loginValidation } = require("../../validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

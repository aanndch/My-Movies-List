const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/:username", async (req, res) => {
  const user = await User.find(
    { username: req.params.username },
    "-password"
  ).exec();
  res.send(user);
});

module.exports = router;

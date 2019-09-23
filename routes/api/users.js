const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).exec();
  res.send(user);
});

module.exports = router;

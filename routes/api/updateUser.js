const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const verify = require("../../verifyToken");

router.post("/:id", verify, async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      location: req.body.location,
      gender: req.body.gender
    },
    { new: true },
    (err, docs) => {
      res.send(docs);
    }
  ).exec();
});

module.exports = router;

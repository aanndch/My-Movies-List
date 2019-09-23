const express = require("express");
const router = express.Router();
const verify = require("../../verifyToken");
const User = require("../../models/User");

router.post("/:id", verify, async (req, res) => {
  const movie = {
    ...req.body.movie
  };

  const list = req.body.list;

  const userInfo = await User.findById(req.user._id, (err, doc) => {
    if (err) return res.status(404).send("Not logged in!");
    return doc;
  });

  const operator = userInfo[list]
    .map(item => item.movieId)
    .includes(req.body.movie.movieId)
    ? "$pull"
    : "$addToSet";

  User.findByIdAndUpdate(
    req.user._id,
    { [operator]: { [list]: movie } },
    { new: true }
  ).exec();

  res.send("Done");
});

module.exports = router;

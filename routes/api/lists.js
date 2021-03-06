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

  const operation =
    operator === "$pull" ? `Removed from ${list}!` : `Added to ${list}!`;

  User.findByIdAndUpdate(
    req.user._id,
    { [operator]: { [list]: movie } },
    { new: true },
    () => res.send({ _id: req.user._id, token: req.body.token, operation })
  ).exec();
});

module.exports = router;

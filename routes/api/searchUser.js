const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/:username", async (req, res) => {
  await User.find(
    { username: req.params.username },
    "-password",
    (err, docs) => {
      if (docs.length < 1) {
        res.status(404).send("User doesn't exist!");
      } else {
        res.send(docs);
      }
    }
  ).exec();
  // res.send(user);
});

module.exports = router;

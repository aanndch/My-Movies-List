const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  console.log(req.body);
  res.send("Success!");
});

module.exports = router;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  date: {
    type: Date,
    default: Date.now
  },
  favorites: [
    {
      showId: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      poster: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("user", userSchema);

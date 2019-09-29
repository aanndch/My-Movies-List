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
  firstName: {
    type: String,
    min: 6,
    max: 1024
  },
  lastName: {
    type: String,
    min: 6,
    max: 1024
  },
  country: {
    type: String,
    min: 6,
    max: 1024
  },
  Gender: {
    type: String
  },
  image: {
    type: String,
    default: `https://api.adorable.io/avatars/${Math.floor(Math.random * 5000)}`
  },
  date: {
    type: Date,
    default: Date.now
  },
  favorites: [
    {
      movieId: {
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
  ],
  watchlist: [
    {
      movieId: {
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
  ],
  watched: [
    {
      movieId: {
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

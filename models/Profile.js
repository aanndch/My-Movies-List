const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  // TODO Add User ID
  uid: String,
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
      image: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Profile = mongoose.model("profile", profileSchema);

// [
//   {
//     _id: "2a1s3",
//     username: "Anand",
//     password: "H234DSDK234",
//     email: "anand@gmail.com",
//     date: Date.now,
//     favorites: [
//       {
//         id: "123", // ID of Movie from TMDB API
//         title: "Batman",
//         image: "https://img1",
//         date: Date.now,
//       },
//     ],
//     watchlist: [{}],
//     watched: [{}],
//     watching: [{}],
//   }
// ]

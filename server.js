const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const register = require("./routes/api/auth");
const users = require("./routes/api/users");
const searchUser = require("./routes/api/searchUser");
const lists = require("./routes/api/lists");
const updateUser = require("./routes/api/updateUser");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(error => console.log(error));

// Routes
app.use("/api", register);
app.use("/api/users", users);
app.use("/api/users/search", searchUser);
app.use("/api/users/update", updateUser);
app.use("/api/users/lists", lists);

// Serve static assests if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

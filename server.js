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
  .connect(process.env.MONGODB_URI, {
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

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => console.log(`Server started!`));

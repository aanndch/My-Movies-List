const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const register = require("./routes/api/auth");
const users = require("./routes/api/users");
const lists = require("./routes/api/lists");

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
app.use("/api/user", users);
app.use("/api/user/lists", lists);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

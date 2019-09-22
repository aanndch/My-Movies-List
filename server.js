const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const register = require("./routes/api/auth");

const app = express();

app.use(cors());
app.use(express.json());

const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(error => console.log(error));

// Routes
// app.use("/api/profiles", profiles);
app.use("/api/user", register);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

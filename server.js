const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require("express");
const dbConfig = require("./config/database.config");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserRoute = require("./routes/user.routes");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());

mongoose
  .connect(dbConfig.url)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Could not connecct to DB", err);
    process.exit();
  });

app.use("/users", UserRoute);

app.listen(5000, () => {
  console.log("Server is running on 5000");
});

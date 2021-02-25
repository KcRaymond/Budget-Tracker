//handles server requests
const express = require("express");

const logger = require("morgan");
//middleware logger logs details
const mongoose = require("mongoose");
//implements JS code to work with MongoDB
const compression = require("compression");
//compresses data that is served to users

const PORT = process.env.PORT || 3000;
//sets env environment or local host port 3000

const app = express();
//sets express connection to app

app.use(logger("dev"));
//Morgan connection

app.use(compression());
//compression connection

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//express app connections
app.use(express.static("public"));

//mongoose connection that uses Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/budgetTracker",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

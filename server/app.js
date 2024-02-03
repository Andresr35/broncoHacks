require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// const cors = require("cors");

var indexRouter = require("./routes/index");
const apiRouter = require("./api/index");

// Connect to database
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// const mongoDB = process.env.MONGOPASS;
const mongoDB = "mongodb+srv://vinhph003:passworde@cluster0.zdxrkke.mongodb.net/?retryWrites=true&w=majority";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("connected");
}

var app = express();

// app.use(cors({ origin:  }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500).json({
    message: "An unknown error has occured",
    error: err,
    errorMessage: err.message,
  });
});

module.exports = app;

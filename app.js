//necessary libraries
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

//routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const inventoryRoute = require("./routes/inventory");
const addInventoryRoute = require("./routes/addInventory");
const getAssetRoute = require("./routes/asset");
const addAssignedRoute = require("./routes/addAsigned");
const addCommentRoute = require("./routes/addComment");
const addIssueRoute = require("./routes/addIssue");

//creating app
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//routers
app.use("/", indexRouter);
app.use("/", inventoryRoute);
app.use("/page", addInventoryRoute);
app.use("/page", getAssetRoute);
app.use("/page", addAssignedRoute);
app.use("/page", addCommentRoute);
app.use("/page", addIssueRoute);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

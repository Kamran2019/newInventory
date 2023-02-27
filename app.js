//necessary libraries
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

//extra security package
// const helmet = require("helmet");
// const cors = require("cors");
// const xss = require("xss-clean");
// const rateLimiter = require("express-rate-limit");

//routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const inventoryRoute = require("./routes/inventory");
const addInventoryRoute = require("./routes/addInventory");
const getAssetRoute = require("./routes/asset");
const addAssignedRoute = require("./routes/addAsigned");
const addCommentRoute = require("./routes/addComment");
const addIssueRoute = require("./routes/addIssue");
const loginPageRouter = require("./routes/login");
const authenticateUser = require("./middleware/auth");

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

// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   })
// );
// app.use(helmet());
// app.use(cors());
// app.use(xss());

//routers
app.use("/page", indexRouter);
app.use("/api", authenticateUser, inventoryRoute);
app.use("/page", addInventoryRoute);
app.use("/page", getAssetRoute);
app.use("/page", addAssignedRoute);
app.use("/page", addCommentRoute);
app.use("/page", addIssueRoute);
app.use("/", loginPageRouter);
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

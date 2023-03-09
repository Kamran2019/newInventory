//necessary libraries
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const methodOverride = require("method-override");
const FirestoreStore = require("firestore-store")(session);

const admin = require("./src/db/db-connection");

//extra security package
const helmet = require("helmet");
const csp = require("helmet-csp");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const initializePassport = require("./src/security/passport-config");
initializePassport(passport);

var app = express();

// view engine setup
app.use(express.static(path.join(__dirname, "/src/public")));
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "ejs");


// Get Firestore Database from Admin SDK
const db = admin.firestore();

// Use FirestoreStore for Express session store
//middleware
const store = new FirestoreStore({
  database: db,
});

app.use(
  session({
    store: store,
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(methodOverride("_method"));

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(helmet());
app.use(
  csp({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js",
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://cdn.jsdelivr.net",
        "http://www.w3.org/2000/svg",
      ],
      imgSrc: ["'self'", "data:"],
    },
  })
);

app.use(cors());
app.use(xss());

//setting routes
require("./src/routes")(app, passport, admin);

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

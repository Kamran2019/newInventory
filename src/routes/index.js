const { getAllInventory } = require("../controller").landingPageController;
var usersRouter = require("./users");
const inventoryRoute = require("./inventory");
const loginPageRouter = require("./login");
const logoutRouter = require("./logout");
const pageRouter = require("./page");

//auth check middleware
const authCheck = require("../middleware/authCheck");
const notAuthCheck = require("../middleware/notAuthCheck");

module.exports = function (app, passport) {
  app.get("/", authCheck, getAllInventory);
  app.post(
    "/login",

    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );
  app.use("/api", authCheck, inventoryRoute);
  app.use("/page", authCheck, pageRouter);
  app.use("/login", notAuthCheck, loginPageRouter);
  app.use("/logout", logoutRouter);
  app.use("/users", usersRouter);
};

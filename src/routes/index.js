const { getAllInventory } = require("../controller").landingPageController;
var usersRouter = require("./users");
const inventoryRoute = require("./inventory");
const loginPageRouter = require("./login");
const logoutRouter = require("./logout");
const pageRouter = require("./page");

const userDb = require("../model/user");

//auth check middleware
const authCheck = require("../middleware/authCheck");
const notAuthCheck = require("../middleware/notAuthCheck");

module.exports = function (app, passport, admin) {
  app.get("/", authCheck, getAllInventory);
  app.post(
    "/login",

    passport.authenticate("local-login", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    (req, res) => {
      // Store Session Record in User's Firestore Document
      const sessionRecord = {
        sid: req.sessionID,
        createdAt: admin.firestore.Timestamp.now(),
      };
      userDb
        .doc(req.user.email)
        .update({
          sessionRecords: admin.firestore.FieldValue.arrayUnion(sessionRecord),
        })
        .then(() => {
          console.log(`done`);
          res.redirect("/");
        })
        .catch((err) => {
          res.status(500).send(err.message);
        });
    }
  );
  app.use("/api", authCheck, inventoryRoute);
  app.use("/page", authCheck, pageRouter);
  app.use("/login", notAuthCheck, loginPageRouter);
  app.use("/logout", logoutRouter);
  app.use("/users", usersRouter);
};

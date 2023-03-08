const LocalStrategy = require("passport-local").Strategy;
const { loginService } = require("../services/user");
const userDb = require("../model/user");
function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const body = { email, password };
    //console.log(body);
    resultRef = await loginService(body);
    if (resultRef.result === 2) {
      return done(null, false, { message: "Invalid Credentials" });
    }
    if (resultRef.result === 3) {
      return done(null, false, { message: "Invalid Credentials" });
    }
    if (resultRef.result === 0) {
      return done(null, resultRef.user);
    }
  };

  passport.use(
    "local-login",
    new LocalStrategy({ usernameField: "email" }, authenticateUser)
  );
  passport.serializeUser((user, done) => {
    console.log("serialize");
    return done(null, user.email);
  });
  passport.deserializeUser((email, done) => {
    console.log("deserialize");
    userDb
      .doc(email)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          done(new Error("User not found."));
        } else {
          done(null, doc.data());
        }
      })
      .catch((err) => {
        done(err);
      });
  });
}
module.exports = initialize;

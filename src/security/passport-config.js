const LocalStrategy = require("passport-local").Strategy;
const { loginService } = require("../services/user");
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
    return done(null, user);
  });
  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
}
module.exports = initialize;

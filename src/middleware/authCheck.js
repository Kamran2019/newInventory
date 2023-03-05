function checkAuthenticated(req, res, next) {
  console.log(`checkAuthenticated: check authenticated`);
  console.log(`session Id : ` + req.sessionID);
  if (req.isAuthenticated()) {
    console.log(`checkAuthenticated: user is authenticated`);
    return next();
  }
  console.log(`checkAuthenticated:users isn't authenticated`);
  res.redirect("/login");
}

module.exports = checkAuthenticated;

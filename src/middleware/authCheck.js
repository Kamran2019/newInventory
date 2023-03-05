function checkAuthenticated(req, res, next) {
  console.log(`Function check authenticated`);
  console.log(`session Id : ` + req.sessionID);
  console.log(`about to check authenticated `);
  if (req.isAuthenticated()) {
    console.log(`checkAuthenticated: user is authenticated`);
    return next();
  }
  console.log(`checkAuthenticated:users isn't authenticated`);
  res.redirect("/login");
}

module.exports = checkAuthenticated;

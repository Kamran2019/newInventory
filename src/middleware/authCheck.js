function checkAuthenticated(req, res, next) {
  console.log(`checkAuthenticated: check authenticated`);
  if (req.isAuthenticated()) {
    console.log(`checkAuthenticated: user is authenticated`);
    return next();
  }
  console.log(`checkAuthenticated:users isn't authenticated`);
  res.redirect("/login");
}

module.exports = checkAuthenticated;

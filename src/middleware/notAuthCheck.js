function checkNotAuthenticated(req, res, next) {
  //    console.log(`checkNotAuthenticated: in check not authenticated`);
  if (req.isAuthenticated()) {
    //      console.log(`checkNotAuthenticated: user is authenticated`);
    return res.redirect("/");
  }
  //    console.log(`checkNotAuthenticated: user is'nt authenticated`);
  next();
}

module.exports = checkNotAuthenticated;

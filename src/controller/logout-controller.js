const logout = (req, res) => {
  console.log("in logout");
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};

module.exports = logout;

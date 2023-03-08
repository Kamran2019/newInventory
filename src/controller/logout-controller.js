const userDb = require("../model/user");
const admin = require("../db/db-connection");
const logout = (req, res) => {
  console.log("in logout");
  const sessionRecord = {
    sid: req.sessionID,
  };
  userDb
    .doc(req.user.email)
    .update({
      sessionRecords: admin.firestore.FieldValue.arrayRemove(sessionRecord),
    })
    .then(() => {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/login");
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = logout;

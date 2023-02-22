var express = require("express");
var router = express.Router();

/* GET users listing. */

router.get("/addIssue", (req, res) => {
  res.render("add-issue");
});

module.exports = router;

var express = require("express");
var router = express.Router();

/* GET users listing. */

router.get("/addComment", (req, res) => {
  res.render("add-comment");
});

module.exports = router;

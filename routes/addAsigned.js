var express = require("express");
var router = express.Router();

/* GET users listing. */

router.get("/addAssigned", (req, res) => {
  res.render("add-assigned");
});

module.exports = router;

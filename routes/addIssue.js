var express = require("express");
var router = express.Router();
const { addNewIssue } = require("../controller/add-issue-page-controller");
/* GET users listing. */

router.get("/addIssue", addNewIssue);

module.exports = router;

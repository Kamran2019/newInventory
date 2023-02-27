var express = require("express");
var router = express.Router();

const {
  addNewAssigned,
} = require("../controller/add-assigned-page-controller");
/* GET users listing. */

router.get("/addAssigned", addNewAssigned);

module.exports = router;

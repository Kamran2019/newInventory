var express = require("express");
var router = express.Router();

const { loginpage } = require("../controller").getLoginPageController;
/* GET users listing. */

router.get("/", loginpage);

module.exports = router;

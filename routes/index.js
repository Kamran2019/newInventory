var express = require("express");
var router = express.Router();
const { getAllInventory } = require("../controller/index-page-controller");

/* GET home page. */
router.get("/", getAllInventory);

module.exports = router;

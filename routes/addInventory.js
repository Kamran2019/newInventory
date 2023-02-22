var express = require("express");
var router = express.Router();
const {
  Addnewinventory,
} = require("../controller/add-inventory-page-controller");

/* GET home page. */
router.get("/addInventory", Addnewinventory);

module.exports = router;

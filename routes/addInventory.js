var express = require("express");
var router = express.Router();
const {
  addNewInventory,
} = require("../controller/add-inventory-page-controller");


router.get("/addInventory", addNewInventory);

module.exports = router;

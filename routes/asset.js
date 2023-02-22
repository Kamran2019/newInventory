var express = require("express");
var router = express.Router();
const {
  getSingleInventory,
} = require("../controller/get-inventory-page-controller");

/* GET users listing. */
// router.get("/asset/:deviceSerialNumber", getSingleInventory);
router.get("/asset", getSingleInventory);

module.exports = router;

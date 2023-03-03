const logout = require("../controller").getLogoutPageController;
const express = require("express");
const router = express.Router();

router.post("/", logout);

module.exports = router;

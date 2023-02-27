var express = require("express");
var router = express.Router();
const { addNewComment } = require("../controller/add-comment-page-controller");
/* GET users listing. */

router.get("/addComment", addNewComment);

module.exports = router;

const express = require("express");
const router = express.Router();

const { addNewAssigned } = require("../controller").addAssignedPageController;
const { addNewComment } = require("../controller").addCommentPageController;
const { addNewInventory } = require("../controller").addInventoryPageController;
const { addNewIssue } = require("../controller").addIssuePageController;
const { getSingleInventory } =
  require("../controller").getInventoryPageController;

router.get("/asset", getSingleInventory);
router.get("/addIssue", addNewIssue);
router.get("/addInventory", addNewInventory);

router.get("/addComment", addNewComment);

router.get("/addAssigned", addNewAssigned);

module.exports = router;

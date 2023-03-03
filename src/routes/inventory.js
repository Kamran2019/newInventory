const express = require("express");
const router = express.Router();

const {
  getAllInventory,
  addToInventory,
  getSingleInventory,
  updateSingleInventory,
  deleteInventory,
  getAllAssigned,
  addToAssigned,
  getAllComments,
  addToComments,
  getAllIssues,
  resolveIssues,
  addToIssues,
  removeInventoryFromAssigned,
  getAllFreeInventory,
} = require("../controller").inventoryApiController;

router.get("/inventory", getAllInventory);
router.get("/inventory/:deviceSerialNumber", getSingleInventory);
router.get("/freeinventory", getAllFreeInventory);
router.post("/inventory", addToInventory);
router.patch("/inventory/:deviceSerialNumber", updateSingleInventory);
router.delete("/inventory/:deviceSerialNumber", deleteInventory);
router.get("/inventory/:deviceSerialNumber/assigned", getAllAssigned);
router.patch("/inventory/:deviceSerialNumber/assigned", addToAssigned);
router.patch(
  "/inventory/:deviceSerialNumber/removeassigned",
  removeInventoryFromAssigned
);
router.get("/inventory/:deviceSerialNumber/comment", getAllComments);
router.patch("/inventory/:deviceSerialNumber/comment", addToComments);
router.get("/inventory/:deviceSerialNumber/issue", getAllIssues);
router.patch("/inventory/:deviceSerialNumber/issue", addToIssues);
router.patch("/inventory/:deviceSerialNumber/resolution", resolveIssues);

module.exports = router;

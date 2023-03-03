const { getSingleInventoryService } = require("../services/inventory");

const getSingleInventory = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  const inventoryRef = await getSingleInventoryService(id);
  //  console.log(inventoryRef);
  if (inventoryRef.result === 1) {
    res.status(404).render("asset", { ...inventoryRef });
  } else if (inventoryRef.result === 0) {
    res.status(200).render("asset", { ...inventoryRef });
  } else {
    res.status(500).render("asset", { ...inventoryRef });
  }
};
module.exports = {
  getSingleInventory,
};

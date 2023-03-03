const { getAllInventoryService } = require("../services/inventory");

const getAllInventory = async (req, res) => {
  const data = await getAllInventoryService();
  //  console.log(data);
  if (data.result === 0) {
    return res.status(200).render("index", { data });
  }
  return res.status(500).render("index", { data });
};

module.exports = {
  getAllInventory,
};

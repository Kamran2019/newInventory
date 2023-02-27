const { getAllInventoryService } = require("../services/inventory");

const getAllInventory = async (req, res) => {
  console.log("in index page controller of get all inventory");
  const data = await getAllInventoryService();

  //  console.log(data);
  if (data.result === 0) {
    console.log("in result 0");
    console.log(data.result);
    return res.status(200).render("index", { data });
  }
  return res.status(500).render("index", { data });
};

module.exports = {
  getAllInventory,
};

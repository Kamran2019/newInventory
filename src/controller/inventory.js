var debug = require("debug")("inventory:server");

const {
  getAllInventoryService,
  getSingleInventoryService,
  addToInventoryService,
  updateSingleInventoryService,
  deleteInventoryService,
  getAllIssuesService,
  resolveIssuesService,
  addToIssuesService,
  getAllCommentsService,
  addToCommentsService,
  getAllAssignedService,
  addToAssignedService,
  removeInventoryFromAssignedService,
  getAllFreeInventoryService,
} = require("..//services/inventory");

const getAllInventory = async (req, res) => {
  debug(`in getAllInventory`);
  const data = await getAllInventoryService();
  if (data.result === 0) {
    return res.status(200).json({ ...data });
  }
  return res.status(500).json({ ...data });
};

const getSingleInventory = async (req, res) => {
  debug(`in getSingleInventory`);
  const deviceSerialNumber = req.params.deviceSerialNumber;
  const inventoryRef = await getSingleInventoryService(deviceSerialNumber);
  if (inventoryRef.result === 1) {
    res.status(404).json({ ...inventoryRef });
  } else if (inventoryRef.result === 0) {
    res.status(200).json({ ...inventoryRef });
  } else {
    res.status(500).json({ ...inventoryRef });
  }
};

const addToInventory = async (req, res) => {
  debug(`in add to inventory`);
  const inventoryRef = await addToInventoryService(req.body);
  if (inventoryRef.result === 0) {
    res.status(201).json({ ...inventoryRef });
  } else if (inventoryRef.result === 3) {
    res.status(200).json({ ...inventoryRef });
  } else {
    res.status(400).json({ ...inventoryRef });
  }
};

const updateSingleInventory = async (req, res) => {
  debug(`in updateSingleInventory`);
  const deviceSerialNumber = req.params.deviceSerialNumber;
  const inventoryRef = await updateSingleInventoryService(
    deviceSerialNumber,
    req.body
  );
  if (inventoryRef.result === 1) {
    res.status(404).json({ ...inventoryRef });
  } else if (inventoryRef.result === 0) {
    res.status(200).json({ ...inventoryRef });
  } else {
    res.status(500).json({ ...inventoryRef });
  }
};

const deleteInventory = async (req, res) => {
  debug(`in updateSingleInventory`);
  const deviceSerialNumber = req.params.deviceSerialNumber;
  const inventoryRef = await deleteInventoryService(deviceSerialNumber);
  if (inventoryRef.result === 1) {
    res.status(404).json({ ...inventoryRef });
  } else if (inventoryRef.result === 0) {
    res.status(200).json({ ...inventoryRef });
  } else {
    res.status(500).json({ ...inventoryRef });
  }
};

const getAllIssues = async (req, res) => {
  debug(`in getAllIssues`);
  const deviceSerialNumber = req.params.deviceSerialNumber;
  const inventoryRef = await getAllIssuesService(deviceSerialNumber);
  if (inventoryRef.result === 1) {
    res.status(404).json({ ...inventoryRef });
  } else if (inventoryRef.result === 0) {
    res.status(200).json({ ...inventoryRef });
  } else {
    res.status(500).json({ ...inventoryRef });
  }
};

const resolveIssues = async (req, res) => {
  debug(`in resolveIssues`);
  const deviceSerialNumber = req.params.deviceSerialNumber;
  const inventoryRef = await resolveIssuesService(deviceSerialNumber, req.body);
  if (inventoryRef.result === 1) {
    res.status(404).json({ ...inventoryRef });
  } else if (inventoryRef.result === 0) {
    res.status(200).json({ ...inventoryRef });
  } else {
    res.status(500).json({ ...inventoryRef });
  }
};

const addToIssues = async (req, res) => {
  debug(`in addToIssues`);
  const deviceSerialNumber = req.params.deviceSerialNumber;
  const inventoryRef = await addToIssuesService(deviceSerialNumber, req.body);
  if (inventoryRef.result === 1) {
    res.status(404).json({ ...inventoryRef });
  } else if (inventoryRef.result === 0) {
    res.status(200).json({ ...inventoryRef });
  } else {
    res.status(500).json({ ...inventoryRef });
  }
};

const getAllComments = async (req, res) => {
  debug(`in getAllComments`);
  const deviceSerialNumber = req.params.deviceSerialNumber;
  const inventoryRef = await getAllCommentsService(deviceSerialNumber);
  if (inventoryRef.result === 1) {
    res.status(404).json({ ...inventoryRef });
  } else if (inventoryRef.result === 0) {
    res.status(200).json({ ...inventoryRef });
  } else {
    res.status(500).json({ ...inventoryRef });
  }
};

const addToComments = async (req, res) => {
  debug(`in addToComments`);
  const deviceSerialNumber = req.params.deviceSerialNumber;
  const inventoryRef = await addToCommentsService(deviceSerialNumber, req.body);
  if (inventoryRef.result === 1) {
    res.status(404).json({ ...inventoryRef });
  } else if (inventoryRef.result === 0) {
    res.status(200).json({ ...inventoryRef });
  } else {
    res.status(500).json({ ...inventoryRef });
  }
};

const getAllAssigned = async (req, res) => {
  debug(`in getAllAssigned`);
  const deviceSerialNumber = req.params.deviceSerialNumber;
  const inventoryRef = await getAllAssignedService(deviceSerialNumber);
  if (inventoryRef.result === 1) {
    res.status(404).json({ ...inventoryRef });
  } else if (inventoryRef.result === 0) {
    res.status(200).json({ ...inventoryRef });
  } else {
    res.status(500).json({ ...inventoryRef });
  }
};

const addToAssigned = async (req, res) => {
  debug(`in addToAssigned`);
  const deviceSerialNumber = req.params.deviceSerialNumber;
  const inventoryRef = await addToAssignedService(deviceSerialNumber, req.body);
  if (inventoryRef.result === 1) {
    res.status(404).json({ ...inventoryRef });
  } else if (inventoryRef.result === 0) {
    res.status(200).json({ ...inventoryRef });
  } else {
    res.status(500).json({ ...inventoryRef });
  }
};
const removeInventoryFromAssigned = async (req, res) => {
  debug(`in removeInventoryFromAssigned`);
  const deviceSerialNumber = req.params.deviceSerialNumber;
  const inventoryRef = await removeInventoryFromAssignedService(
    deviceSerialNumber
  );
  if (inventoryRef.result === 1) {
    res.status(404).json({ ...inventoryRef });
  } else if (inventoryRef.result === 0) {
    res.status(200).json({ ...inventoryRef });
  } else if (inventoryRef.result === 3) {
    res.status(200).json({ ...inventoryRef });
  } else {
    res.status(500).json({ ...inventoryRef });
  }
};

const getAllFreeInventory = async (req, res) => {
  debug(`in getAllFreeInventory`);
  const inventoryRef = await getAllFreeInventoryService();
  if (inventoryRef.result === 1) {
    res.status(404).json({ ...inventoryRef });
  } else if (inventoryRef.result === 0) {
    res.status(200).json({ ...inventoryRef });
  } else {
    res.status(500).json({ ...inventoryRef });
  }
};

module.exports = {
  getAllInventory,
  addToInventory,
  getSingleInventory,
  updateSingleInventory,
  deleteInventory,
  getAllAssigned,
  addToAssigned,
  removeInventoryFromAssigned,
  getAllComments,
  addToComments,
  getAllIssues,
  resolveIssues,
  addToIssues,
  getAllFreeInventory,
};

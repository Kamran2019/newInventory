//importing necessary requirements
const firebase = require("../db/db-connection");
const inventory = require("../model/inventory");
const db = firebase.firestore();
var debug = require("debug")("inventory:server");

//function to get all inventory
async function getAllInventoryService() {
  try {
    debug("in get All Inventory");
    const inventoryRef = await db.collection("inventory").get();
    const inventoryArray = [];
    inventoryRef.forEach((doc) => {
      // const { Assigned, Issues, Comments, ...data } = doc.data();
      const { ...data } = doc.data();
      inventoryArray.push({ id: doc.id, ...data });
    });
    return { result: 0, data: inventoryArray };
  } catch (error) {
    return { result: 2, message: "Internal server error" };
  }
}

//function to get singleInventory
async function getSingleInventoryService(deviceSerialNumber) {
  try {
    //    debug(typeof deviceSerialNumber);
    //    console.log(typeof deviceSerialNumber);
    //    debug(deviceSerialNumber);
    const inventoryRef = await db
      .collection("inventory")
      .doc(deviceSerialNumber)
      .get();
    //    debug(inventoryRef.exists);
    if (!inventoryRef.exists) {
      return { result: 1, message: "Inventory not found" };
    } else {
      return {
        result: 0,
        data: { id: inventoryRef.id, ...inventoryRef.data() },
      };
    }
  } catch (error) {
    return { result: 2, message: "Internal server error" };
  }
}

//function to add new asset/inventory in the db
//here data is inputs that we get from controller

async function addToInventoryService(data) {
  try {
    const inventoryRef = await db
      .collection("inventory")
      .doc(data.DeviceSerialNumber)
      .get();
    if (!inventoryRef.exists) {
      debug(data.DeviceSerialNumber);
      await db.collection("inventory").doc(data.DeviceSerialNumber).set(data);
      return { result: 0, data };
    } else {
      return { result: 3, message: "Asset of this id already exist " };
    }
  } catch (error) {
    return { result: 2, message: "Bad request" };
  }
}

//updating a certain feature or features
//here deviceSerialNumber is the key on basis of which we can find the device
async function updateSingleInventoryService(deviceSerialNumber, updatedData) {
  try {
    const inventoryRef = await db
      .collection("inventory")
      .doc(deviceSerialNumber)
      .get();
    if (!inventoryRef.exists) {
      return { result: 1, message: "Inventory not found" };
    } else {
      await db
        .collection("inventory")
        .doc(deviceSerialNumber)
        .update(updatedData);
      return { result: 0, message: "Inventory updated successfully" };
    }
  } catch (error) {
    return { result: 2, message: "Bad request" };
  }
}

//deleting a inventory on basis of a device serial number
async function deleteInventoryService(deviceSerialNumber) {
  try {
    const inventoryRef = db.collection("inventory").doc(deviceSerialNumber);
    const inventoryDoc = await inventoryRef.get();
    if (!inventoryDoc.exists) {
      return {
        result: 1,
        message: `Inventory with device serial number ${deviceSerialNumber} does not exist.`,
      };
    }
    await inventoryRef.delete();
    return {
      result: 0,
      message: `Inventory with device serial number ${deviceSerialNumber} deleted successfully.`,
    };
  } catch (error) {
    return {
      result: 2,
      message: `Error deleting inventory with device serial number ${deviceSerialNumber}. Error: ${error}`,
    };
  }
}

//getting all the issue list related to a particular asset
async function getAllIssuesService(deviceSerialNumber) {
  try {
    const inventoryRef = await db
      .collection("inventory")
      .doc(deviceSerialNumber)
      .get();
    if (!inventoryRef.exists) {
      return { result: 1, message: "Inventory not found" };
    } else {
      const inventory = inventoryRef.data();
      const issues = inventory.Issues;
      return { result: 0, data: issues };
    }
  } catch (error) {
    return { result: 2, message: "Internal server error" };
  }
}

// resolve issue resolve a particular issue of a particular device serial number
async function resolveIssuesService(deviceSerialNumber, body) {
  try {
    const inventoryRef = await db
      .collection("inventory")
      .doc(deviceSerialNumber)
      .get();
    debug(body);
    if (!inventoryRef.exists) {
      return { result: 1, message: "Inventory not found" };
    } else {
      const inventory = inventoryRef.data();
      filteredIssue = inventory.Issues.filter(
        (issue) => issue.issueId === Number(body.issueId)
      );
      debug("in filtered " + filteredIssue);
      filteredIssue[0].resolution = body.resolution;
      await db
        .collection("inventory")
        .doc(deviceSerialNumber)
        .update({ Issues: inventory.Issues });
      return { result: 0, data: filteredIssue[0] };
    }
  } catch (error) {
    return { result: 2, message: "Bad request" };
  }
}

//this create a new issue regarding a particular device serial number

async function addToIssuesService(deviceSerialNumber, body) {
  try {
    const inventoryRef = await db
      .collection("inventory")
      .doc(deviceSerialNumber)
      .get();
    if (!inventoryRef.exists) {
      return { result: 1, message: "Inventory not found" };
    } else {
      const inventory = inventoryRef.data();
      let id;
      if (inventory.Issues.length === 0) {
        id = 1;
      } else {
        id = inventory.Issues.length + 1;
      }
      const newIssue = {
        issueId: id,
        issue: body.issue,
        resolution: body.resolution || "",
        issueDate: new Date().toISOString().split("T")[0],
      };
      inventory.Issues.push(newIssue);
      await db
        .collection("inventory")
        .doc(deviceSerialNumber)
        .update({ Issues: inventory.Issues });
      return { result: 0, data: newIssue };
    }
  } catch (error) {
    return { result: 2, message: `there is a server side error` };
  }
}

//get all the comments regarding particular device serial number
async function getAllCommentsService(deviceSerialNumber) {
  try {
    const inventoryRef = await db
      .collection("inventory")
      .doc(deviceSerialNumber)
      .get();
    if (!inventoryRef.exists) {
      return { result: 1, message: "Inventory not found" };
    } else {
      const inventory = inventoryRef.data();
      const comments = inventory.Comments;
      return { result: 0, data: comments };
    }
  } catch (error) {
    return { result: 2, message: "Internal server error" };
  }
}

//add a new comment regarding a particular device
async function addToCommentsService(deviceSerialNumber, body) {
  try {
    const inventoryRef = await db
      .collection("inventory")
      .doc(deviceSerialNumber)
      .get();
    if (!inventoryRef.exists) {
      return { result: 1, message: "Inventory not found" };
    } else {
      const currentDate = new Date().toISOString().split("T")[0];
      const inventory = inventoryRef.data();
      const newComment = {
        comment: body.comment,
        dateOfComment: currentDate,
      };
      inventory.Comments.push(newComment);
      await db
        .collection("inventory")
        .doc(deviceSerialNumber)
        .update({ Comments: inventory.Comments });
      return { result: 0, data: newComment };
    }
  } catch (error) {
    return { result: 2, message: "Bad request" };
  }
}

//get all the assigned task from a db
async function getAllAssignedService(deviceSerialNumber) {
  try {
    const inventoryRef = await db
      .collection("inventory")
      .doc(deviceSerialNumber)
      .get();
    if (!inventoryRef.exists) {
      return { result: 1, message: "Inventory not found" };
    } else {
      const inventory = inventoryRef.data();
      const assigned = inventory.Assigned;
      return { result: 0, data: assigned };
    }
  } catch (error) {
    return { result: 2, message: "Internal server error" };
  }
}

async function addToAssignedService(deviceSerialNumber, body) {
  try {
    const inventoryRef = await db
      .collection("inventory")
      .doc(deviceSerialNumber)
      .get();
    if (!inventoryRef.exists) {
      return { result: 1, message: "Inventory not found" };
    } else {
      const currentDate = new Date().toISOString().split("T")[0];
      const inventory = inventoryRef.data();
      const previousAssigned =
        inventory.Assigned[inventory.Assigned.length - 1];
      debug(previousAssigned);
      if (previousAssigned) {
        previousAssigned.dateOfDischarge = currentDate;
      }
      //      debug(previousAssigned);
      const newAssigned = {
        assignedToName: body.assignedToName,
        dateOfAssignment: currentDate,
        dateOfDischarge: "",
        password: body.password,
      };
      debug(newAssigned);
      inventory.Assigned.push(newAssigned);
      await db
        .collection("inventory")
        .doc(deviceSerialNumber)
        .update({ Assigned: inventory.Assigned });
      return { result: 0, data: newAssigned };
    }
  } catch (error) {
    return { result: 2, message: "Bad request" };
  }
}
async function removeInventoryFromAssignedService(deviceSerialNumber) {
  try {
    const inventoryRef = await db
      .collection("inventory")
      .doc(deviceSerialNumber)
      .get();
    if (!inventoryRef.exists) {
      return { result: 1, message: "Inventory not found" };
    } else {
      const currentDate = new Date().toISOString().split("T")[0];
      const inventory = inventoryRef.data();
      const previousAssigned =
        inventory.Assigned[inventory.Assigned.length - 1];
      console.log(previousAssigned);
      if (previousAssigned) {
        if (previousAssigned.dateOfDischarge === "") {
          previousAssigned.dateOfDischarge = currentDate;
          await db
            .collection("inventory")
            .doc(deviceSerialNumber)
            .update({ Assigned: inventory.Assigned });
          return { result: 0, data: previousAssigned };
        }
      }
      return {
        result: 3,
        message: "The asset is free so we cant discharge it",
      };
    }
  } catch (error) {
    return { result: 2, message: "Bad request" };
  }
}

async function getAllFreeInventoryService() {
  try {
    const inventoryRef = await db.collection("inventory").get();
    const inventoryArray = [];
    inventoryRef.forEach((doc) => {
      const data = doc.data();
      if (
        data.Assigned.length === 0 ||
        data.Assigned[data.Assigned.length - 1].dateOfDischarge !== ""
      ) {
        inventoryArray.push({ id: doc.id, ...data });
      }
    });
    //    console.log(inventoryArray);
    return { result: 0, data: inventoryArray };
  } catch (error) {
    return { result: 2, message: "Internal server error" };
  }
}
module.exports = {
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
};

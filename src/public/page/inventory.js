const inventoryList = document.querySelector("#Inventory-List");
const searchInput = document.querySelector("#Search-Input");
const searchFoam = document.querySelector("#Search-Form");
const searchButton = document.querySelector("#Search-Button");
const goToAddAsset = document.querySelector("#add-asset");
const filterCheckBox = document.querySelector("#filter");
const logoutBtn = document.querySelector("#logout-Button");
const downloadAssigned = document.querySelector("#download-assigned");
const downloadComment = document.querySelector("#download-comment");
const downloadIssue = document.querySelector("#download-issue");
const downloadBtn = document.querySelector("#download-now-button");
let dataLength;
let assetList;
let filteredList;
let listPrinter;
let downloadIssueFlag = false;
let downloadAssignedFlag = false;
let downloadCommentFlag = false;
const downloadCSV = (blob, filename) => {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }
};

const createCSV = () => {
  let csvContent = `Device-Serial-Number,Name,Description,Type,Purchase-Type,Purchase-Price,Purchased-From,Purchased-Date,Condition-Score,${
    downloadAssignedFlag ? "Assigned ," : ""
  } ${downloadCommentFlag ? "Comments ," : ""} ${
    downloadIssueFlag ? "Issues" : ""
  } \n`;
  listPrinter.map((asset) => {
    let row =
      asset.DeviceSerialNumber +
      "," +
      asset.Name +
      "," +
      asset.Description +
      "," +
      asset.Type +
      "," +
      asset.PurchaseType +
      "," +
      asset.PurchasePrice +
      "," +
      asset.PurchasedFrom +
      "," +
      asset.PurchasedDate +
      "," +
      asset.ConditionScore;
    if (downloadAssignedFlag) {
      const Assigned = asset.Assigned.map(
        (assignee, index) =>
          `Assignee No ${index} :${assignee.assignedToName}  Date Of Assignment : ${assignee.dateOfAssignment}  Date Of Discharge : ${assignee.dateOfDischarge}  Password : ${assignee.password}`
      ).join("");
      console.log(`here in assignee`);
      row = row + "," + Assigned;
    }
    if (downloadCommentFlag) {
      const Comments = asset.Comments.map(
        (Comment, index) =>
          `Comment No ${index}   comment   :${Comment.comment}  Date Of Comment : ${Comment.dateOfComment} `
      ).join("");
      console.log(`here in the comments`);
      row = row + "," + Comments;
    }
    if (downloadIssueFlag) {
      const issues = asset.Issues.map(
        (issue, index) =>
          `Issue No ${index} :${issue.issue}  Date Of Issue : ${
            issue.issueDate
          }  Resolution : ${
            issue.resolution === "" ? "not resolved " : issue.resolution
          }`
      ).join("");
      console.log(`here in issues`);
      row = row + "," + issues;
    }
    row = row + "\n";
    csvContent += row;
  });
  const csvData = new Blob([csvContent], { type: "text/csv" });
  downloadCSV(csvData, "Asset-List.csv");
};

const getAllAsset = async () => {
  try {
    const {
      data: { result, data },
    } = await axios.get("/api/inventory");
    if (data.length === 0) {
      return (inventoryList.innerHTML =
        "<h3>Alas their is no data till yet</h3>");
    }
    dataLength = data.length;
    return data;
  } catch (error) {
    console.log(error);
    return (inventoryList.innerHTML =
      "<h3>Alas their is no data till yet</h3>");
  }
};

const getUnresolvedCount = (assetArray) => {
  let UnresolvedCountArray = [];
  assetArray.map((asset) => {
    let UnresolvedCount = 0;
    asset.Issues.map((issue) => {
      if (issue.resolution === "") {
        UnresolvedCount = UnresolvedCount + 1;
      }
    });
    UnresolvedCountArray.push(UnresolvedCount);
  });
  return UnresolvedCountArray;
};

const printAssetList = (data) => {
  const unresolved = getUnresolvedCount(data);
  assetList = data
    .map((asset, id) => {
      return `<div>
        
        <div class="p-0 single-inventory inventory-container border-bottom border-secondary border-1 Single-Inventory hover-overlay ripple shadow-1-strong rounded"
        data-mdb-ripple-color="light single-inventory" data-id= ${asset.DeviceSerialNumber} id=Single-Inventory${id} "
        > 
        <div class="d-flex flex-row mb-3 justify-content-between">
        <div class="col-3" id="deviceNumber${id}">${asset.DeviceSerialNumber}</div>
        <div class="col-3" style="text-align: center">
                    ${asset.Comments.length}<i>
                      <img
                        src="/icons/comment.svg"
                        style="height: 50px; width: 20px"
                        alt=""
                      />
                    </i>
                  </div>
                  <div class="col-3" style="text-align: center">
                  ${unresolved[id]} <i>
                    <img
                      src="/icons/issue.svg"
                      style="height: 50px; width: 20px"
                      alt=""
                    />
                  </i>
                </div>          
        <div class="col-3" style="text-align: right">${asset.Type}</div>
        </div>
        <div id ="on_hover_${id}" class="dropdown" style="display: none"> 
        <div class="d-flex flex-column justify-content-between mb-3 align-items-center">
        <div class="p-2 text-capitalize"><a style="font-weight: bold; font-style: italic"v>Name:</a> ${asset.Name}</div>
        <div class="p-2 text-capitalize"><a style="font-weight: bold; font-style: italic"v>ConditionScore:</a> ${asset.ConditionScore}</div>
        <div class="p-2 text-capitalize"><a style="font-weight: bold; font-style: italic"v>Description:</a>    ${asset.Description}</div>
        <div class="p-2 text-capitalize"><a style="font-weight: bold; font-style: italic"v>PurchasePrice:</a>  ${asset.PurchasePrice}</div>
        <div class="p-2 text-capitalize"><a style="font-weight: bold; font-style: italic"v>PurchasedDate:</a>  ${asset.PurchasedDate}</div>
        <div class="p-2 text-capitalize"><a style="font-weight: bold; font-style: italic"v>PurchaseType:</a>  ${asset.PurchaseType}</div>
        <div class="p-2 text-capitalize"><a style="font-weight: bold; font-style: italic"v>PurchasedFrom:</a> ${asset.PurchasedFrom}</div>
        </div>
        </div>
        </div>
        </div>`;
    })
    .join("");
  inventoryList.innerHTML = assetList;
};

const goToAssetEventListner = () => {
  const allSingleInventory = document.querySelectorAll(".single-inventory");
  allSingleInventory.forEach((singleInventory) => {
    singleInventory.addEventListener("click", () => {
      const id = singleInventory.getAttribute("data-id");
      window.location.href = `/page/asset?id=${id}`;
    });
  });
};

goToAddAsset.addEventListener("click", (e) => {
  window.location.href = `/page/addInventory`;
});
const onSubmitter = () => {
  const searchedText = searchInput.value;
  filteredList = listPrinter.filter((asset) =>
    asset.DeviceSerialNumber.includes(searchedText.trim())
  );
  if (filteredList.length > 0) {
    printAssetList(filteredList);
    goToAssetEventListner();
  }
};

searchInput.addEventListener("keyup", (e) => {
  e.preventDefault();
  onSubmitter();
});

searchFoam.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmitter();
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  onSubmitter();
});

downloadAssigned.addEventListener("input", () => {
  if (downloadAssigned.checked) {
    downloadAssignedFlag = true;
  } else {
    downloadAssignedFlag = false;
  }
});

downloadComment.addEventListener("input", () => {
  if (downloadComment.checked) {
    downloadCommentFlag = true;
  } else {
    downloadCommentFlag = false;
  }
});

downloadIssue.addEventListener("input", () => {
  if (downloadIssue.checked) {
    downloadIssueFlag = true;
  } else {
    downloadIssueFlag = false;
  }
});

downloadBtn.addEventListener("click", () => {
  createCSV();
});

filterCheckBox.addEventListener("input", async () => {
  if (filterCheckBox.checked) {
    try {
      const {
        data: { result, data },
      } = await axios.get("/api/freeinventory");
      if (data.length === 0) {
        return (inventoryList.innerHTML =
          `<h3>Alas their is no free asset right now till yet</h3>`.join(""));
      } else {
        const freeAssetList = data;
        printAssetList(freeAssetList);
        goToAssetEventListner();
      }
    } catch (error) {
      alert(error);
    }
  } else {
    printAssetList(listPrinter);
    goToAssetEventListner();
  }
});

logoutBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await axios.post("/logout").then(() => {
      window.location.href = `/login`;
    });
  } catch (error) {
    console.log(error.response);
  }
});
window.addEventListener("load", async (e) => {
  goToAssetEventListner();
  listPrinter = await getAllAsset();
});

// const data = [
//   {
//     "name": "John Doe",
//     "age": 30,
//     "addresses": [
//       {
//         "street": "123 Main St",
//         "city": "Anytown",
//         "state": "CA",
//         "zip": "12345"
//       },
//       {
//         "street": "456 Elm St",
//         "city": "Othertown",
//         "state": "CA",
//         "zip": "67890"
//       }
//     ]
//   },
//   {
//     "name": "Jane Doe",
//     "age": 25,
//     "addresses": [
//       {
//         "street": "789 Oak St",
//         "city": "Somewhere",
//         "state": "CA",
//         "zip": "45678"
//       }
//     ]
//   }
// ];

// Get a list of all the unique keys in the objects
// const keys = Array.from(new Set(data.flatMap(Object.keys)));

// Create the header row with the keys
// const header = keys.join(",") + ",addresses";

// Convert each object into a CSV row
// const rows = data.map((obj) => {
//   const values = keys.map((key) => obj[key] ?? "");
// const addresses = obj.addresses
//   .map((addr) => `${addr.street}, ${addr.city}, ${addr.state} ${addr.zip}`)
//   .join(";");
// return [...values, addresses];
// });

// Combine the header and rows into a single CSV string
// const csv = [header, ...rows].map((row) => row.join(",")).join("\n");
// console.log(csv);

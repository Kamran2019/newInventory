const inventoryList = document.querySelector("#Inventory-List");
const searchInput = document.querySelector("#Search-Input");
const searchFoam = document.querySelector("#Search-Form");
const searchButton = document.querySelector("#Search-Button");
const goToAddAsset = document.querySelector("#add-asset");
const filterCheckBox = document.querySelector("#filter");
const logoutBtn = document.querySelector("#logout-Button");
let dataLength;
let assetList;
let filteredList;
let listPrinter;
const getAllAsset = async () => {
  try {
    const {
      data: { result, data },
    } = await axios.get("/api/inventory", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (data.length === 0) {
      return (inventoryList.innerHTML =
        "<h3>Alas their is no data till yet</h3>");
    }
    dataLength = data.length;
    return data;
    //style="display:none"
  } catch (error) {
    console.log(error);
    return (inventoryList.innerHTML =
      "<h3>Alas their is no data till yet</h3>");
  }
};

const printAssetList = (data) => {
  assetList = data
    .map((asset, id) => {
      return `<div>
        
        <div class=" single-inventory inventory-container border-bottom border-secondary border-1 Single-Inventory hover-overlay ripple shadow-1-strong rounded"
        data-mdb-ripple-color="light single-inventory" data-id= ${asset.DeviceSerialNumber} id=Single-Inventory${id} "
        > 
        <div class="d-flex flex-row mb-3 justify-content-between">
        <div class="p-2" id="deviceNumber${id}">${asset.DeviceSerialNumber}</div>
        <div class="p-2">${asset.Type}</div>
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
  //  console.log("in asset event listener");
  const allSingleInventory = document.querySelectorAll(".single-inventory");
  //  console.log(allSingleInventory);
  allSingleInventory.forEach((singleInventory) => {
    singleInventory.addEventListener("click", () => {
      //      console.log(singleInventory.getAttribute("data-id"));
      window.location.href = `/page/asset?id=${singleInventory.getAttribute(
        "data-id"
      )}`;
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
  //  console.log(`on search input change`);
  e.preventDefault();
  onSubmitter();
});

searchFoam.addEventListener("submit", (e) => {
  //  console.log(`on search foam submit`);
  e.preventDefault();
  onSubmitter();
});

searchButton.addEventListener("click", (e) => {
  //  console.log(`on search button click`);
  e.preventDefault();
  onSubmitter();
});

filterCheckBox.addEventListener("input", async () => {
  if (filterCheckBox.checked) {
    //    console.log("filterCheckBox is checked");
    try {
      const {
        data: { result, data },
      } = await axios.get("/api/freeinventory", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      //      console.log(data);
      if (data.length === 0) {
        return (inventoryList.innerHTML =
          `<h3>Alas their is no free asset right now till yet</h3>`.join(""));
      } else {
        const freeAssetList = data;
        printAssetList(freeAssetList);
        goToAssetEventListner();
        //        listEventListner(freeAssetList.length);
      }
    } catch (error) {
      alert(error);
    }
  } else {
    //    console.log("filterCheckBox is unchecked");
    //    listPrinter = await getAllAsset();
    printAssetList(listPrinter);
    goToAssetEventListner();
  }
});

logoutBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  window.location.replace("/");
});
window.addEventListener("load", async (e) => {
  // e.preventDefault();
  // listPrinter = await getAllAsset();
  // printAssetList(listPrinter);
  // listEventListner(dataLength);
  goToAssetEventListner();

  listPrinter = await getAllAsset();
  console.log(listPrinter);
});

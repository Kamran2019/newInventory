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

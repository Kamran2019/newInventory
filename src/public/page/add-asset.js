let hiddenDiv = document.querySelector("#hidden-div");
let hiddenDivMessage = document.querySelector("#hidden-div-message");
const addAsset = document.querySelector("#add-asset-button");
const assetFoam = document.querySelector("#add-asset-foam");
const backBtn = document.querySelector("#back-btn");

const handleSubmit = async () => {
  const DeviceSerialNumber = document
    .querySelector("#device-serial-number")
    .value.trim();
  let deviceSerialNumberFlag = true;
  if (DeviceSerialNumber === "" || DeviceSerialNumber.includes(" ")) {
    deviceSerialNumberFlag = false;
  }
  console.log(DeviceSerialNumber.length);

  const Name = document.querySelector("#name").value.trim();
  let nameFlag = true;
  if (Name === "") {
    nameFlag = false;
  }

  const Description = document.querySelector("#description").value.trim();
  let descriptionFlag = true;
  if (Description === "") {
    descriptionFlag = false;
  }

  const PurchasedDate = document.querySelector("#purchased-date").value.trim();
  console.log(typeof PurchasedDate + "the date" + PurchasedDate);
  let purchasedDateFlag = true;
  if (PurchasedDate === "") {
    purchasedDateFlag = false;
  }

  const PurchasedFrom = document.querySelector("#purchased-from").value.trim();
  let purchasedFromFlag = true;
  if (PurchasedFrom === "") {
    purchasedFromFlag = false;
  }

  const PurchasePrice = document.querySelector("#purchase-price").value;
  let PurchasePriceFlag = true;
  if (PurchasePrice === "") {
    PurchasePriceFlag = false;
  }

  let deviceTypeFlag = false;
  const deviceTypeRadio = document.getElementsByName("device-type");
  let Type;
  for (i = 0; i < deviceTypeRadio.length; i++) {
    if (deviceTypeRadio[i].checked) {
      deviceTypeFlag = true;
      Type = deviceTypeRadio[i].value;
    }
  }

  let purchaseTypeFlag = false;
  const purchaseTypeRadio = document.getElementsByName("purchase-type");
  let PurchaseType;
  for (i = 0; i < purchaseTypeRadio.length; i++) {
    if (purchaseTypeRadio[i].checked) {
      purchaseTypeFlag = true;
      PurchaseType = purchaseTypeRadio[i].value;
    }
  }
  const selectConditionScore = document.querySelector("#condition-score");
  const ConditionScore = selectConditionScore.value;
  let conditionScoreFlag = true;
  if (
    ConditionScore !== "very-good" &&
    ConditionScore !== "good" &&
    ConditionScore !== "needs-maintenance" &&
    ConditionScore !== "needs-replacement"
  ) {
    conditionScoreFlag = false;
  }

  const input = {
    DeviceSerialNumber,
    PurchasedFrom,
    Description,
    Name,
    PurchasedDate,
    Type,
    PurchaseType,
    ConditionScore,
    PurchasePrice,
  };

  hiddenDiv.style.display = "none";

  if (
    deviceSerialNumberFlag &&
    nameFlag &&
    descriptionFlag &&
    purchasedDateFlag &&
    purchasedFromFlag &&
    deviceTypeFlag &&
    purchaseTypeFlag &&
    conditionScoreFlag &&
    PurchasePriceFlag
  ) {
    try {
      const result = await axios.post("/api/inventory", {
        ...input,
      });
      if (result.data.result === 0) {
        hiddenDiv.classList.remove("alert-danger");
        hiddenDiv.classList.add("alert-success");
        hiddenDivMessage.textContent = "Added Successfully";
        hiddenDiv.style.display = "block";
      }
    } catch (error) {
      if (error.response.data.result === 3) {
        hiddenDiv.classList.remove("alert-success");
        hiddenDiv.classList.add("alert-danger");
        hiddenDivMessage.textContent = "This device number already exist";
        hiddenDiv.style.display = "block";
      } else if (error.response.data.result === 2) {
        hiddenDiv.classList.remove("alert-success");
        hiddenDiv.classList.add("alert-danger");
        hiddenDivMessage.textContent =
          "Something went wrong please try again !!!";
        hiddenDiv.style.display = "block";
      } else if (error.response.data.result === 4) {
        hiddenDiv.classList.remove("alert-success");
        hiddenDiv.classList.add("alert-danger");
        hiddenDivMessage.textContent = error.response.data.message;
        hiddenDiv.style.display = "block";
      }
    }

    assetFoam.reset();
  } else if (!deviceSerialNumberFlag) {
    hiddenDiv.classList.remove("alert-success");
    hiddenDiv.classList.add("alert-danger");
    hiddenDivMessage.textContent = `Please enter Device Serial Number or The device number u entered has a space in it`;
    hiddenDiv.style.display = "block";
  } else if (!nameFlag) {
    hiddenDiv.classList.remove("alert-success");
    hiddenDiv.classList.add("alert-danger");
    hiddenDivMessage.textContent = ` Please enter the name of the device`;
    hiddenDiv.style.display = "block";
  } else if (!descriptionFlag) {
    hiddenDiv.classList.remove("alert-success");
    hiddenDiv.classList.add("alert-danger");
    hiddenDivMessage.textContent = `Please fill the description field `;
    hiddenDiv.style.display = "block";
  } else if (!purchasedDateFlag) {
    hiddenDiv.classList.remove("alert-success");
    hiddenDiv.classList.add("alert-danger");
    hiddenDivMessage.textContent = `Please enter the purchase date `;
    hiddenDiv.style.display = "block";
  } else if (!purchasedFromFlag) {
    hiddenDiv.classList.remove("alert-success");
    hiddenDiv.classList.add("alert-danger");
    hiddenDivMessage.textContent = `Please fill purchase from field `;
    hiddenDiv.style.display = "block";
  } else if (!PurchasePriceFlag) {
    hiddenDiv.classList.remove("alert-success");
    hiddenDiv.classList.add("alert-danger");
    hiddenDivMessage.textContent = `You cant add "-" or "_" in Purchase price. It can  only be a number or decimal. `;
    hiddenDiv.style.display = "block";
  } else if (!deviceTypeFlag) {
    hiddenDiv.classList.remove("alert-success");
    hiddenDiv.classList.add("alert-danger");
    hiddenDivMessage.textContent = `You need to add the device type`;
    hiddenDiv.style.display = "block";
  } else if (purchaseTypeFlag === false) {
    hiddenDiv.classList.remove("alert-success");
    hiddenDiv.classList.add("alert-danger");
    hiddenDivMessage.textContent = "Please select a purchase type";
    hiddenDiv.style.display = "block";
  } else {
    hiddenDiv.classList.remove("alert-success");
    hiddenDiv.classList.add("alert-danger");
    hiddenDivMessage.textContent =
      "Please select the one of the condition scores ";
    hiddenDiv.classList.add("alert-success");
    hiddenDiv.style.display = "block";
  }
};

addAsset.addEventListener("click", async (e) => {
  console.log(`in add asset`);
  e.preventDefault();
  await handleSubmit();
});

assetFoam.addEventListener("submit", async (e) => {
  console.log(`in add asset`);

  e.preventDefault();
  await handleSubmit();
});

backBtn.addEventListener("click", () => {
  window.location.href = `/`;
});

let hiddenDiv = document.querySelector("#hidden-div");
let hiddenDivMessage = document.querySelector("#hidden-div-message");
const addAsset = document.querySelector("#add-asset-button");
const assetFoam = document.querySelector("#add-asset-foam");
const backBtn = document.querySelector("#back-btn");

const handleSubmit = async () => {
  const DeviceSerialNumber = document.querySelector(
    "#device-serial-number"
  ).value;
  let deviceSerialNumberFlag = true;
  if (DeviceSerialNumber === "" || DeviceSerialNumber.includes(" ")) {
    deviceSerialNumberFlag = false;
    //    console.log(deviceSerialNumberFlag);
  }

  const Name = document.querySelector("#name").value;
  let nameFlag = true;
  if (Name === "") {
    nameFlag = false;
    //    console.log(nameFlag);
  }

  const Description = document.querySelector("#description").value;
  let descriptionFlag = true;
  if (Description === "") {
    descriptionFlag = false;
    //    console.log(descriptionFlag);
  }

  const PurchasedDate = document.querySelector("#purchased-date").value;
  console.log(typeof PurchasedDate + "the date" + PurchasedDate);
  let purchasedDateFlag = true;
  if (PurchasedDate === "") {
    purchasedDateFlag = false;
    //    console.log(purchasedDateFlag);
  }

  const PurchasedFrom = document.querySelector("#purchased-from").value;
  let purchasedFromFlag = true;
  if (PurchasedFrom === "") {
    purchasedFromFlag = false;
    //    console.log(purchasedFromFlag);
  }

  const PurchasePrice = document.querySelector("#purchase-price").value;
  //  console.log(typeof PurchasePrice);
  let PurchasePriceFlag = true;
  //  console.log(PurchasePrice);
  //  console.log(PurchasePrice === "");
  if (PurchasePrice === "") {
    PurchasePriceFlag = false;
    //    console.log(PurchasePriceFlag);
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
  //  console.log(Type);

  let purchaseTypeFlag = false;
  const purchaseTypeRadio = document.getElementsByName("purchase-type");
  let PurchaseType;
  for (i = 0; i < purchaseTypeRadio.length; i++) {
    if (purchaseTypeRadio[i].checked) {
      purchaseTypeFlag = true;
      PurchaseType = purchaseTypeRadio[i].value;
    }
  }
  //  console.log(PurchaseType);

  //
  const selectConditionScore = document.querySelector("#condition-score");
  const ConditionScore = selectConditionScore.value;
  //  console.log(ConditionScore);
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
      const result = await axios.post("/inventory", { ...input });
      //      console.log(result.data.result);
      if (result.data.result === 3) {
        //        console.log(hiddenDiv);
        hiddenDiv.classList.remove("alert-success");
        hiddenDiv.classList.add("alert-danger");
        hiddenDivMessage.textContent = "This device number already exist";
        hiddenDiv.style.display = "block";
      }
      if (result.data.result === 0) {
        //        console.log(hiddenDiv);
        hiddenDiv.classList.remove("alert-danger");
        hiddenDiv.classList.add("alert-success");
        hiddenDivMessage.textContent = "Added Successfully";
        hiddenDiv.style.display = "block";
      }
    } catch (error) {
      //      console.log(error);
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
    //    console.log(`in description field `);
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
  e.preventDefault();
  await handleSubmit();
});

assetFoam.addEventListener("submit", async (e) => {
  e.preventDefault();
  await handleSubmit();
});

backBtn.addEventListener("click", () => {
  window.location.href = `/`;
});

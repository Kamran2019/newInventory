const editAsset = document.querySelector("#edit-button");
const updateAsset = document.querySelector("#update-button");
const updateAssetFoam = document.querySelector("#update-asset-foam");
let hiddenDiv = document.querySelector("#hidden-div");
let hiddenDivMessage = document.querySelector("#hidden-div-message");
const id = new URLSearchParams(window.location.search).get("id");
const foamDiv = document.querySelector("#foam-div");
const errorDiv = document.querySelector("#not-found-div");
let assignedListDiv = document.querySelector("#assigned-list");
let issueListDiv = document.querySelector("#issue-list");
let commentListDiv = document.querySelector("#comment-list");
const freeAsset = document.querySelector("#free-asset");
const addAssigned = document.querySelector("#add-assigned");
const addNewIssue = document.querySelector("#add-issue");
const addComment = document.querySelector("#add-comment");
const backBtn = document.querySelector("#back-btn");
const deleteBtn = document.querySelector("#delete-button");
const freeAssetText = document.querySelector("#free-asset3");

//resolve model deceleration
const issueIdModal = document.querySelector("#issue-id");
const issueModal = document.querySelector("#issue");
const resolutionModal = document.querySelector("#resolution");
const resolutionBtnModel = document.querySelector("#Resolve-button");
const resolveModal = document.querySelector("#Resolve-issue-modal");
const modalHiddenDiv = document.querySelector("#modal-hidden-div");
const modalHiddenDivMessage = document.querySelector(
  "#modal-hidden-div-message"
);
const resolveIssueFoamModel = document.querySelector("#resolve-issue-foam");

const getSingleAsset = async () => {
  try {
    const {
      data: { result, data },
    } = await axios.get(`/api/inventory/${id}`);
    if (result === 1) {
    } else {
    }
    return data;
  } catch (error) {
    console.log(error);
    foamDiv.style.display = "none";
    errorDiv.style.display = "block";
    errorDiv.classList.remove("alert-success");
    errorDiv.classList.add("alert-danger");
    errorDiv.textContent = "We don't have any device of that serial number";
    errorDiv.scrollIntoView();
  }
};

const setAssigned = (Assigned) => {
  const assignedTableBody = document.querySelector("#assigned-body");
  const assignedList = Assigned.map((assign) => {
    return `<tr>
      <td>${assign.assignedToName}</td>
      <td>${assign.dateOfAssignment}</td>
      <td>${assign.dateOfDischarge}</td>
      <td>${assign.password}</td>
    </tr>`;
  }).join("");
  assignedTableBody.innerHTML = assignedList;
};

const setIssue = (Issues) => {
  const issuesTableBody = document.querySelector("#issue-body");
  const issueList = Issues.map((issue) => {
    return `<tr>
    <td>${issue.issueId}</td>
    <td>${issue.issue}</td>
    <td>${issue.issueDate}</td>
    <td>${
      issue.resolution === ""
        ? `<button class="btn btn-outline-primary Resolve" type="button" data-bs-toggle="modal" data-bs-target="#Resolve-issue-modal" data-id="${issue.issueId}" data-issue="${issue.issue}"> Resolve</button>`
        : issue.resolution
    }</td>
  </tr>`;
  }).join("");
  issuesTableBody.innerHTML = issueList;
  const resolveBtn = document.querySelectorAll(".Resolve");
  resolveBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      issueIdModal.value = btn.getAttribute("data-id");
      issueModal.value = btn.getAttribute("data-issue");
    });
  });
};

const setComments = (Comments) => {
  const commentsTableBody = document.querySelector("#comment-body");
  const commentList = Comments.map((comment) => {
    return `<tr>
    <td>${comment.comment}</td>
    <td>${comment.dateOfComment}</td>
  </tr>`;
  }).join("");
  commentsTableBody.innerHTML = commentList;
};

const resolveBtnCreator = () => {
  const resolveBtn = document.querySelectorAll(".Resolve");

  resolveBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      issueIdModal.value = btn.getAttribute("data-id");
      issueModal.value = btn.getAttribute("data-issue");
    });
  });
};

const modalHandleSubmit = async () => {
  if (resolutionModal.value === "") {
    modalHiddenDiv.classList.remove("alert-success");
    modalHiddenDiv.classList.add("alert-danger");
    modalHiddenDivMessage.textContent = `Please fill out the resolve field `;
    modalHiddenDiv.style.display = "block";
    return;
  } else {
    input = {
      issueId: issueIdModal.value,
      resolution: resolutionModal.value,
    };
    const result = await axios.patch(`/api/inventory/${id}/resolution`, {
      ...input,
    });
    if (result.data.result === 0) {
      modalHiddenDiv.classList.remove("alert-danger");
      modalHiddenDiv.classList.add("alert-success");
      modalHiddenDivMessage.textContent = "Resolved Successfully";
      modalHiddenDiv.style.display = "block";
    }
  }
  await setInitialValue().then(() => {
    $("#Resolve-issue-modal").modal("hide");
  });
};

resolutionBtnModel.addEventListener("click", async (e) => {
  e.preventDefault();
  await modalHandleSubmit();
  resolveIssueFoamModel.reset();
});

resolveIssueFoamModel.addEventListener("submit", async (e) => {
  e.preventDefault();
  await modalHandleSubmit();
  resolveIssueFoamModel.reset();
});

const setInitialValue = async () => {
  const singleInventory = await getSingleAsset();
  document.querySelector("#device-serial-number").value =
    singleInventory.DeviceSerialNumber;

  document.querySelector("#name").value = singleInventory.Name;
  document.querySelector("#description").value = singleInventory.Description;

  document.querySelector("#purchased-date").value =
    singleInventory.PurchasedDate;
  document.querySelector("#purchased-from").value =
    singleInventory.PurchasedFrom;
  document.querySelector("#purchase-price").value =
    singleInventory.PurchasePrice;

  const deviceTypeRadio = document.getElementsByName("device-type");
  for (i = 0; i < deviceTypeRadio.length; i++) {
    if (deviceTypeRadio[i].value === singleInventory.Type) {
      deviceTypeRadio[i].checked = true;
    }
  }

  const purchaseTypeRadio = document.getElementsByName("purchase-type");
  for (i = 0; i < purchaseTypeRadio.length; i++) {
    if (purchaseTypeRadio[i].value === singleInventory.PurchaseType) {
      purchaseTypeRadio[i].checked = true;
    }
  }

  const selectConditionScoreRadio =
    document.getElementsByName("Condition-Score");
  for (i = 0; i < selectConditionScoreRadio.length; i++) {
    if (selectConditionScoreRadio[i].value === singleInventory.ConditionScore) {
      selectConditionScoreRadio[i].checked = true;
    }
  }
  setAssigned(singleInventory.Assigned);
  setComments(singleInventory.Comments);
  setIssue(singleInventory.Issues);
};

const handleSubmit = async () => {
  const DeviceSerialNumber = document
    .querySelector("#device-serial-number")
    .value.trim();
  let deviceSerialNumberFlag = true;
  if (DeviceSerialNumber === "") {
    deviceSerialNumberFlag = false;
  }

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

  const selectConditionScoreRadio =
    document.getElementsByName("Condition-Score");
  let ConditionScore;
  for (i = 0; i < selectConditionScoreRadio.length; i++) {
    if (selectConditionScoreRadio[i].checked) {
      ConditionScore = selectConditionScoreRadio[i].value;
    }
  }
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
      const result = await axios.patch(`/api/inventory/${id}`, { ...input });
      if (result.data.result === 0) {
        hiddenDiv.classList.remove("alert-danger");
        hiddenDiv.classList.add("alert-success");
        hiddenDivMessage.textContent = "Updated Successfully";
        hiddenDiv.style.display = "block";
        hiddenDiv.scrollIntoView();
      }
    } catch (error) {
      if (error.response.data.result === 2) {
        hiddenDiv.classList.remove("alert-success");
        hiddenDiv.classList.add("alert-danger");
        hiddenDivMessage.textContent =
          "An error has occurred please try again ";
        hiddenDiv.style.display = "block";
      } else if (error.response.data.result === 1) {
        hiddenDiv.classList.remove("alert-success");
        hiddenDiv.classList.add("alert-danger");
        hiddenDivMessage.textContent = error.response.data.message;
        hiddenDiv.style.display = "block";
      } else if (error.response.data.result === 4) {
        hiddenDiv.classList.remove("alert-success");
        hiddenDiv.classList.add("alert-danger");
        hiddenDivMessage.textContent = error.response.data.message;
        hiddenDiv.style.display = "block";
      }
    }

    updateAssetFoam.reset();
  } else if (!deviceSerialNumberFlag) {
    hiddenDiv.classList.remove("alert-success");
    hiddenDiv.classList.add("alert-danger");
    hiddenDivMessage.textContent = `Please enter Device Serial Number `;
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

editAsset.addEventListener("click", (e) => {
  e.preventDefault();
  inputs = updateAssetFoam.querySelectorAll("input,textarea, select");
  inputs.forEach((input) => {
    if (input.id !== "device-serial-number" && input.name !== "device-type") {
      input.removeAttribute("readonly");
      input.removeAttribute("disabled");
    }
  });
  editAsset.style.display = "none";
  updateAsset.style.display = "block";
  deleteBtn.style.display = "none";
});

updateAsset.addEventListener("click", async (e) => {
  e.preventDefault();
  await handleSubmit();
  inputs = updateAssetFoam.querySelectorAll("input,textarea, select");
  inputs.forEach((input) => {
    if (input.id !== "device-serial-number") {
      input.setAttribute("readonly", "true");
      input.setAttribute("disabled", "true");
    }
  });
  editAsset.style.display = "block";
  updateAsset.style.display = "none";
  deleteBtn.style.display = "block";

  await setInitialValue();
});

updateAssetFoam.addEventListener("submit", async (e) => {
  e.preventDefault();
  await handleSubmit();
  inputs = updateAssetFoam.querySelectorAll("input,textarea, select");
  inputs.forEach((input) => {
    if (input.id !== "device-serial-number" && input.name !== "device-type") {
      input.setAttribute("readonly", "true");
      input.setAttribute("disabled", "true");
    }
  });
  editAsset.style.display = "block";
  updateAsset.style.display = "none";
  deleteBtn.style.display = "block";

  await setInitialValue();
});

freeAsset.addEventListener("click", async () => {
  try {
    const result = await axios.patch(`/api/inventory/${id}/removeassigned`);
    console.log(result.data.result);
    if (result.data.result === 0) {
      await setInitialValue().then(() => {
        alert(`Asset with id ${id} is now free`);
        freeAssetText.style.visibility = "visible";
      });
    } else if (result.data.result === 3) {
      await setInitialValue().then(() => {
        alert(`The asset with id ${id} is already free`);
      });
    }
  } catch (error) {
    console.log(error);
    alert("there was a error");
  }
});

addAssigned.addEventListener("click", (e) => {
  window.location.href = `/page/addAssigned?id=${id}`;
});

addNewIssue.addEventListener("click", () => {
  window.location.href = `/page/addIssue?id=${id}`;
});

addComment.addEventListener("click", () => {
  window.location.href = `/page/addComment?id=${id}`;
});

backBtn.addEventListener("click", () => {
  window.location.href = `/`;
});

deleteBtn.addEventListener("click", async () => {
  try {
    const result = await axios.delete(`/api/inventory/${id}`);
    if (result.data.result === 0) {
      backBtn.click();
    } else {
      hiddenDiv.classList.remove("alert-success");
      hiddenDiv.classList.add("alert-danger");
      hiddenDivMessage.textContent = `Cant delete the entry bcz of some error `;
      hiddenDiv.style.display = "block";
    }
  } catch (error) {
    hiddenDiv.classList.remove("alert-success");
    hiddenDiv.classList.add("alert-danger");
    hiddenDivMessage.textContent = `Cant delete the entry bcz of some error `;
    hiddenDiv.style.display = "block";
  }
});

window.addEventListener("load", async (e) => {
  resolveBtnCreator();
});

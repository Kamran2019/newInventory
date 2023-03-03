let hiddenDiv = document.querySelector("#hidden-div");
let hiddenDivMessage = document.querySelector("#hidden-div-message");
const addIssue = document.querySelector("#add-issue-button");
const issueFoam = document.querySelector("#add-issue-foam");
const id = new URLSearchParams(window.location.search).get("id");
const backBtn = document.querySelector("#back-btn");

const handleSubmit = async () => {
  const issue = document.querySelector("#issue").value;
  let issueFlag = true;
  if (issue === "") {
    issueFlag = false;
  }

  const resolution = document.querySelector("#resolution").value;
  let resolutionFlag = true;
  if (resolution === "") {
    resolutionFlag = false;
  }

  let input;
  if (!resolution) {
    input = {
      issue,
    };
  } else {
    input = {
      issue,
      resolution,
    };
  }

  hiddenDiv.style.display = "none";

  if (issueFlag) {
    try {
      const result = await axios.patch(`/api/inventory/${id}/issue`, {
        ...input,
      });
      if (result.data.result === 0) {
        hiddenDiv.classList.remove("alert-danger");
        hiddenDiv.classList.add("alert-success");
        hiddenDivMessage.textContent = "Added Successfully";
        hiddenDiv.style.display = "block";
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

    issueFoam.reset();
  } else {
    hiddenDiv.classList.remove("alert-success");
    hiddenDiv.classList.add("alert-danger");
    hiddenDivMessage.textContent = `Please Describe the Issue in the field`;
    hiddenDiv.style.display = "block";
  }
};

addIssue.addEventListener("click", async (e) => {
  e.preventDefault();
  await handleSubmit();
});

issueFoam.addEventListener("submit", async (e) => {
  e.preventDefault();
  await handleSubmit();
});

backBtn.addEventListener("click", () => {
  window.location.href = `/page/asset?id=${id}`;
});

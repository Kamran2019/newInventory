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
//    console.log(issueFlag);
  }

  const resolution = document.querySelector("#resolution").value;
  let resolutionFlag = true;
  if (resolution === "") {
    resolutionFlag = false;
//    console.log(resolutionFlag);
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
//    console.log(input);
    try {
      const result = await axios.patch(`/inventory/${id}/issue`, {
        ...input,
      });
//      console.log(result.data.result);
      if (result.data.result === 2) {
//        console.log(hiddenDiv);
        hiddenDiv.classList.remove("alert-success");
        hiddenDiv.classList.add("alert-danger");
        hiddenDivMessage.textContent =
          "An error has occurred please try again ";
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

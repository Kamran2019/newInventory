let hiddenDiv = document.querySelector("#hidden-div");
let hiddenDivMessage = document.querySelector("#hidden-div-message");
const addAssigned = document.querySelector("#add-assigned-button");
const assignedFoam = document.querySelector("#add-assigned-foam");
const id = new URLSearchParams(window.location.search).get("id");
const backBtn = document.querySelector("#back-btn");

const handleSubmit = async () => {
  const assignedToName = document.querySelector("#assigned-To-Name").value;
  let assignedToNameFlag = true;
  if (assignedToName === "") {
    assignedToNameFlag = false;
    //    console.log(assignedToNameFlag);
  }

  const password = document.querySelector("#password").value;
  let passwordFlag = true;
  if (password === "") {
    passwordFlag = false;
    //    console.log(passwordFlag);
  }

  const input = {
    assignedToName,
    password,
  };

  hiddenDiv.style.display = "none";

  if (assignedToNameFlag) {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      const result = await axios.patch(`/api/inventory/${id}/assigned`, {
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

    assignedFoam.reset();
  } else if (!assignedToNameFlag) {
    hiddenDiv.classList.remove("alert-success");
    hiddenDiv.classList.add("alert-danger");
    hiddenDivMessage.textContent = `Please enter Name of the person asset is being assigned to`;
    hiddenDiv.style.display = "block";
  }
  // else if (!passwordFlag) {
  //   hiddenDiv.classList.remove("alert-success");
  //   hiddenDiv.classList.add("alert-danger");
  //   hiddenDivMessage.textContent = ` Please fill the password field`;
  //   hiddenDiv.style.display = "block";
  // }
};

addAssigned.addEventListener("click", async (e) => {
  e.preventDefault();
  await handleSubmit();
});

assignedFoam.addEventListener("submit", async (e) => {
  e.preventDefault();
  await handleSubmit();
});

backBtn.addEventListener("click", () => {
  window.location.href = `/page/asset?id=${id}`;
});

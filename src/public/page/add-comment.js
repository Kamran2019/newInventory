let hiddenDiv = document.querySelector("#hidden-div");
let hiddenDivMessage = document.querySelector("#hidden-div-message");
const addComment = document.querySelector("#add-comment-button");
const commentFoam = document.querySelector("#add-comment-foam");
const id = new URLSearchParams(window.location.search).get("id");
const backBtn = document.querySelector("#back-btn");

const handleSubmit = async () => {
  const comment = document.querySelector("#comment").value;
  let commentFlag = true;
  if (comment === "") {
    commentFlag = false;
  }

  const input = {
    comment,
  };

  hiddenDiv.style.display = "none";

  if (commentFlag) {
    try {
      const result = await axios.patch(`/api/inventory/${id}/comment`, {
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

    commentFoam.reset();
  } else {
    hiddenDiv.classList.remove("alert-success");
    hiddenDiv.classList.add("alert-danger");
    hiddenDivMessage.textContent = `Please enter comment`;
    hiddenDiv.style.display = "block";
  }
};

addComment.addEventListener("click", async (e) => {
  e.preventDefault();
  await handleSubmit();
});

commentFoam.addEventListener("submit", async (e) => {
  e.preventDefault();
  await handleSubmit();
});

backBtn.addEventListener("click", () => {
  window.location.href = `/page/asset?id=${id}`;
});

let hiddenDiv = document.querySelector("#hidden-div");
let hiddenDivMessage = document.querySelector("#hidden-div-message");
const loginBtn = document.querySelector("#login-button");
const loginFoam = document.querySelector("#login-foam");

const handleSubmit = async () => {
  const email = document.querySelector("#email").value;
  let emailFlag = true;
  if (email === "") {
    emailFlag = false;
    //    console.log(assignedToNameFlag);
  }

  const password = document.querySelector("#password").value;
  let passwordFlag = true;
  if (password === "") {
    passwordFlag = false;
    //    console.log(passwordFlag);
  }

  const input = {
    email,
    password,
  };

  hiddenDiv.style.display = "none";

  if (emailFlag && passwordFlag) {
    try {
      const result = await axios.post("/users/login", {
        ...input,
      });
      console.log(result.data);

      if (result.data.result === 0) {
        //        console.log(hiddenDiv);
        localStorage.setItem("token", result.data.token);
        console.log(localStorage.getItem("token"));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;

        const data = await axios.get("/page/all-inventory")       // window.location.replace(`/page/all-inventory`);
        console.log(data.data);
      }
    } catch (error) {
      console.log(error);
      //   if (result.data.result === 3) {
      //     //        console.log(hiddenDiv);
      //     hiddenDiv.classList.remove("alert-success");
      //     hiddenDiv.classList.add("alert-danger");
      //     hiddenDivMessage.textContent = "Invalid Credentials";
      //     hiddenDiv.style.display = "block";
      //   }
      //   if (result.data.result === 1) {
      //     hiddenDiv.classList.remove("alert-success");
      //     hiddenDiv.classList.add("alert-danger");
      //     hiddenDivMessage.textContent = "Empty fields";
      //     hiddenDiv.style.display = "block";
      //   }
    }

    loginFoam.reset();
  } else if (!emailFlag) {
    hiddenDiv.classList.remove("alert-success");
    hiddenDiv.classList.add("alert-danger");
    hiddenDivMessage.textContent = `Please enter the email`;
    hiddenDiv.style.display = "block";
  } else if (!passwordFlag) {
    hiddenDiv.classList.remove("alert-success");
    hiddenDiv.classList.add("alert-danger");
    hiddenDivMessage.textContent = ` Please fill the password field`;
    hiddenDiv.style.display = "block";
  }
};

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await handleSubmit();
});

loginFoam.addEventListener("submit", async (e) => {
  e.preventDefault();
  await handleSubmit();
});

window.addEventListener("load", (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
});

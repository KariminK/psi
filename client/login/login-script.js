localStorage.setItem("user", "");

const loginButton = document.querySelector("#login-submit-button");
const showPasswordIcon = document.querySelector("#password-eye-icon");
const usernameLoginInput = document.querySelector("#login-username-input");
const passwordLoginInput = document.querySelector("#login-password-input");

showPasswordIcon.addEventListener("click", () => {
  if (passwordLoginInput.type == "password") {
    passwordLoginInput.setAttribute("type", "text");
    showPasswordIcon.setAttribute("name", "eye-outline");
  } else {
    passwordLoginInput.setAttribute("type", "password");
    showPasswordIcon.setAttribute("name", "eye-off-outline");
  }
});

usernameLoginInput.addEventListener("input", () => {
  let nameTab = [];
  nameTab = usernameLoginInput.value.split("");
  if (nameTab.length > 20) {
    nameTab.pop();
    nameTab = nameTab.join("");
    usernameLoginInput.value = nameTab;
  }
});

loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  login();
});

//Register
const registerButton = document.querySelector("#register-submit-button");
const usernameRegisterInput = document.querySelector(
  "#register-username-input"
);
const passwordRegisterInput = document.querySelector(
  "#register-password-input"
);
const repeatPasswordInput = document.querySelector(
  "#register-repeat-password-input"
);
const repeatedPasswordDiv = document.querySelector(".repeat-password-div");
const classChangeArray = document.querySelectorAll(".register-change-color");

const checkPassword = () => {
  let originalPassword = passwordRegisterInput.value.split("");
  let repeatedPassword = repeatPasswordInput.value.split("");
  let matching = false;
  for (let i = 0; i <= originalPassword.length; i++) {
    if (originalPassword.length != repeatedPassword.length) {
      matching = false;
      break;
    }
    if (originalPassword[i] != repeatedPassword[i]) {
      matching = false;
      break;
    }
    matching = true;
  }
  if (matching == false) {
    if (repeatedPasswordDiv.nextElementSibling.nodeName !== "P") {
      let errorMessageParagraph = document.createElement("p");
      errorMessageParagraph.textContent = "Passwords should be the same!";
      errorMessageParagraph.setAttribute("id", "password-error");
      repeatedPasswordDiv.insertAdjacentElement(
        "afterend",
        errorMessageParagraph
      );
    }

    classChangeArray.forEach((item) => {
      if (item.classList.contains("matching-password"))
        item.classList.remove("matching-password");
      item.classList.add("not-matching-password");
    });
  } else {
    const deleteElement = document.querySelector("#password-error");
    deleteElement.remove();

    classChangeArray.forEach((item) => {
      if (item.classList.contains("not-matching-password"))
        item.classList.remove("not-matching-password");
      item.classList.add("matching-password");
    });
  }
  return matching;
};

usernameRegisterInput.addEventListener("input", () => {
  let nameTab = [];
  nameTab = usernameRegisterInput.value.split("");
  if (nameTab.length > 20) {
    nameTab.pop();
    nameTab = nameTab.join("");
    usernameRegisterInput.value = nameTab;
  }
});

repeatPasswordInput.addEventListener("input", () => {
  if (
    passwordRegisterInput.value.length !== 0 &&
    repeatPasswordInput.value.length !== 0
  ) {
    checkPassword();
  } else {
    classChangeArray.forEach((item) => {
      item.classList.remove("matching-password");
      item.classList.remove("not-matching-password");
      const deleteElement = document.querySelector("#password-error");
      deleteElement?.remove();
    });
  }
});

passwordRegisterInput.addEventListener("input", () => {
  if (
    repeatPasswordInput.value.length !== 0 &&
    passwordRegisterInput.value.length !== 0
  ) {
    checkPassword();
  } else {
    classChangeArray.forEach((item) => {
      item.classList.remove("matching-password");
      item.classList.remove("not-matching-password");
      const deleteElement = document.querySelector("#password-error");
    });
  }
});

registerButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (checkPassword()) {
    register();
  }
});

const login = async () => {
  const response = await fetch("http://localhost:3000/user/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: usernameLoginInput.value,
      password: passwordLoginInput.value,
    }),
  });
  const data = await response.json();
  console.log(data);
  if (data.loggedIn) {
    console.log("Successfully logged in!");
    localStorage.setItem(
      "user",
      JSON.stringify({
        login: usernameLoginInput.value,
        id: data.userId,
      })
    );
    location.href = "../";
  } else {
    console.log(data.reason);
  }
};

const register = async () => {
  const response = await fetch("http://localhost:3000/user/register", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      login: usernameRegisterInput.value,
      password: passwordRegisterInput.value,
    }),
  });
  const data = await response.json();
  console.log(data);
  if (data.registered) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        login: usernameRegisterInput.value,
        id: data.userId,
      })
    );
    location.href = "../";
  } else {
    console.log(data.reason);
  }
};

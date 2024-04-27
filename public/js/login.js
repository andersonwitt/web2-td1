const emailInput = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");
import baseFetch from "./shared/fetch.js";

function signIn(data) {
  return baseFetch("/api/login", "POST", data);
}

async function login(e) {
  e.preventDefault();
  let form = e.target;
  let formData = {};

  for (let i = 0; i < form.elements.length; i++) {
    let element = form.elements[i];

    if (element.tagName === "INPUT") {
      formData[element.name] = element.value;
    }
  }
  signIn(formData).then(async (response) => {
    if (response.redirected) {
      window.location.href = response.url;
      return;
    }

    const obj = await response.json();

    if (obj.message && !obj.success) {
      alert(obj.message);
      emailInput.value = "";
      password.value = "";
      emailInput.focus();
      return;
    }
  });
}

window.addEventListener("load", () => {
  form.addEventListener("submit", login);
});

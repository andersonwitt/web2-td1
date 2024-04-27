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
    const obj = await response.json();

    if (obj.success && !obj.message) {
      window.location.href = `${window.location.origin}/home`
      return;
    }

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

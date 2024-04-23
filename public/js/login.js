const userName = document.getElementById("username");
const password = document.getElementById("password");
const form = document.querySelector("form");
import baseFetch from './shared/fetch.js';

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
  await signIn(formData).then(async (response) => {
    if (response.redirected) {
      window.location.href = response.url;
      return;
    }
    const obj = await response.json();

    if (response.status === 401 && obj.error) {
      alert(obj.error);
      userName.value = "";
      password.value = "";
      userName.focus();
    }
  });
}

window.addEventListener("load", () => {
  form.addEventListener("submit", login);
});

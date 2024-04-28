import baseFetch from "./shared/fetch.js";

const form = document.querySelector("form");

function createCategory(data) {
  return baseFetch("/api/category", "POST", data);
}

function submitForm(e) {
  e.preventDefault();
  let form = e.target;
  let formData = new FormData(form);
  let payload = Object.fromEntries(formData);
  createCategory(payload).then(async (response) => {
    try {
      const obj = await response.json();

      if (!obj.success && obj.message) {
        alert(obj.message);
        return;
      }

      alert(obj.message);
    } catch (error) {
      console.error("Erro na solicitação:", error);
      alert("Erro na solicitação. Por favor, tente novamente mais tarde.");
    }
  });
}

window.addEventListener("load", () => {
  form.addEventListener("submit", submitForm);
});
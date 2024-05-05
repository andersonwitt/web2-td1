import { handleSubmitFor } from "./shared/formUtils.js";

const form = document.querySelector("form");

window.addEventListener("load", () => {
  form.addEventListener(
    "submit",
    handleSubmitFor("account", "accounts", accountData.id)
  );
});

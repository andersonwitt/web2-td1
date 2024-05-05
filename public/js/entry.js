import { handleSubmitFor } from "./shared/formUtils.js";

const form = document.querySelector("form");

window.addEventListener("load", () => {
  const valueField = document.getElementById("value");

  valueField.addEventListener("input", function (e) {
    let value = e.target.value;

    value = value.replace(/\D/g, "");
    value = Number(value) / 100;

    if (isNaN(value) || value === "") {
      value = 0;
    }

    const formatter = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
    });

    e.target.value = formatter.format(value);
  });

  form.addEventListener(
    "submit",
    handleSubmitFor("entry", "entries", entryData.id)
  );
});

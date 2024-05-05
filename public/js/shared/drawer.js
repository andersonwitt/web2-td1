import { signOut } from "./formUtils.js";

window.addEventListener("load", () => {
  document.getElementById("exit-button").addEventListener("click", signOut);
  document
    .getElementById("openDrawerBtn")
    .addEventListener("click", function () {
      const drawer = document.getElementById("drawer");

      if (drawer.classList.contains("open")) {
        drawer.classList.remove("open");
        return;
      }

      drawer.classList.add("open");
    });

  document.addEventListener("click", function (event) {
    const drawer = document.getElementById("drawer");
    const openDrawerBtn = document.getElementById("openDrawerBtn");

    if (!drawer.contains(event.target) && event.target !== openDrawerBtn) {
      drawer.classList.remove("open");
    }
  });
});

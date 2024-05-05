import { handleDeleteFor } from "./shared/formUtils.js";

window.addEventListener("load", () => {
  const removeButtons = document.querySelectorAll("#table-delete-action");
  removeButtons.forEach((item) => {
    item.addEventListener("click", () => {
      const paths = item.getAttribute("data-item-id").split("/");
      const id = paths[paths.length - 1];
      const confirmation = confirm(
        `Você tem certeza que deseja excluir lançamento com o id ${id}`
      );

      if (confirmation) {
        handleDeleteFor("entry", "entries", id);
      }
    });
  });
});

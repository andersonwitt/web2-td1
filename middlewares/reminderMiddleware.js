import { getTableInfo } from "../utils/read.js";

export function sortByDueDate(a, b) {
  if (a.due_date > b.due_date) {
    return 1;
  }
  if (a.due_date < b.due_date) {
    return -1;
  }
  return 0;
}

export const reminderMiddleware = (_, res, next) => {
  const todayIso = new Date().toISOString().split("T")[0];

  const data = getTableInfo({
    fileName: "entries",
    route: "entry",
    dataMap: [
      ["id", "ID"],
      ["type", "Tipo"],
      ["categories", "Categorias"],
      ["description", "Descrição"],
      ["value", "Valor"],
      ["due_date", "Data do vencimento"],
      ["payment_date", "Data do pagamento"],
      ["account", "Conta"],
      ["status", "Status"],
      ["comments", "Informações adicionais"],
    ],
    filter: (entry) => entry.due_date <= todayIso,
    hasDelete: true,
    sort: sortByDueDate,
  });
  res.locals.data = data;

  next();
};

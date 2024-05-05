import initialAuthMiddleware from "../middlewares/initialAuthMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getTableInfo } from "../utils/read.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function sortByDueDate(a, b) {
  if (a.due_date > b.due_date) {
    return 1;
  }
  if (a.due_date < b.due_date) {
    return -1;
  }
  return 0;
}

export function useClientRoutes(router) {
  router.get("/", initialAuthMiddleware, (_, res) => {
    res.render("index");
  });

  router.get("/home", authMiddleware, (_, res) => {
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

    res.render("home", data);
  });

  router.get("/user", authMiddleware, (_, res) => {
    res.render("user", { user: {} });
  });

  router.get("/category", authMiddleware, (_, res) => {
    res.render("category", { category: {} });
  });

  router.get("/category/:id", authMiddleware, (req, res) => {
    const categoriesJSONString = fs.readFileSync(
      path.join(__dirname, "../data/categories.json")
    );
    const categories = JSON.parse(categoriesJSONString);
    const category = categories.find((item) => item.id === req.params.id);

    res.render("category", { category });
  });

  router.get("/categories", authMiddleware, (_, res) => {
    const data = getTableInfo({
      fileName: "categories",
      route: "category",
      dataMap: [
        ["id", "ID"],
        ["description", "Descrição"],
        ["type", "Tipo"],
      ],
    });

    res.render("categories", data);
  });

  router.get("/accounts", authMiddleware, (_, res) => {
    const data = getTableInfo({
      fileName: "accounts",
      route: "account",
      dataMap: [
        ["id", "ID"],
        ["description", "Nome"],
        ["comments", "Informações"],
      ],
    });

    res.render("accounts", data);
  });

  router.get("/users", authMiddleware, (_, res) => {
    const data = getTableInfo({
      fileName: "users",
      route: "user",
      dataMap: [
        ["id", "ID"],
        ["name", "Nome"],
        ["email", "Email"],
        ["user", "Usuário"],
        ["level", "Tipo"],
        ["status", "Status"],
      ],
    });

    res.render("users", data);
  });

  router.get("/entries", authMiddleware, (_, res) => {
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
        ["comments", "Possui Comentário"],
      ],
      hasDelete: true,
      sort: sortByDueDate,
    });

    res.render("entries", data);
  });

  router.get("/account", authMiddleware, (_, res) => {
    res.render("account", { account: {} });
  });
  router.get("/account/:id", authMiddleware, (req, res) => {
    const accountsJSONString = fs.readFileSync(
      path.join(__dirname, "../data/accounts.json")
    );
    const accounts = JSON.parse(accountsJSONString);
    const account = accounts.find((item) => item.id === req.params.id);

    res.render("account", { account });
  });

  router.get("/user/:id", authMiddleware, (req, res) => {
    const usersJSONString = fs.readFileSync(
      path.join(__dirname, "../data/users.json")
    );
    const users = JSON.parse(usersJSONString);
    const user = users.find((item) => item.id === req.params.id);

    res.render("user", { user });
  });

  router.get("/entry", authMiddleware, (_, res) => {
    const categoriesJSONString = fs.readFileSync(
      path.join(__dirname, "../data/categories.json")
    );
    const accountsJSONString = fs.readFileSync(
      path.join(__dirname, "../data/accounts.json")
    );

    const categories = JSON.parse(categoriesJSONString);
    const accounts = JSON.parse(accountsJSONString);

    res.render("entry", { accounts, categories, entry: {} });
  });

  router.get("/entry/:id", authMiddleware, (req, res) => {
    const categoriesJSONString = fs.readFileSync(
      path.join(__dirname, "../data/categories.json")
    );
    const accountsJSONString = fs.readFileSync(
      path.join(__dirname, "../data/accounts.json")
    );
    const entriesJSONString = fs.readFileSync(
      path.join(__dirname, "../data/entries.json")
    );

    const categories = JSON.parse(categoriesJSONString);
    const accounts = JSON.parse(accountsJSONString);
    const entries = JSON.parse(entriesJSONString);
    const entry = entries.find((item) => item.id === req.params.id);

    res.render("entry", { entry, accounts, categories });
  });
}

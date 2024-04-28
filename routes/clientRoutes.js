import initialAuthMiddleware from "../middlewares/initialAuthMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getTableInfo } from "../utils/read.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

//TODO - Refatorar rotas de cadastrar/editar e finalizar
//TODO - Corrigir rota da atualizar com checkbox que o status não esta no body quando checked = false
//TODO - Finalizar home page
//TODO - Criar alertas para mensagem de successo e erro e aplica-las
//TODO - Refatorar estilos
//TODO - Refatorar logicas finais
//TODO - Refatorar locais usando valores padrões - ex: your_secret_key e etc.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function useClientRoutes(router) {
  router.get("/", initialAuthMiddleware, (_, res) => {
    res.render("index");
  });

  router.get("/home", authMiddleware, (_, res) => {
    res.render("home", {
      lancamentosDoDia: [{ descricao: "Algo", valor: "R$25,50" }],
    });
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
    const data = getTableInfo("categories", "category", [
      ["id", "ID"],
      ["description", "Descrição"],
      ["type", "Tipo"],
    ]);

    res.render("categories", data);
  });

  router.get("/accounts", authMiddleware, (_, res) => {
    const data = getTableInfo("accounts", "account", [
      ["id", "ID"],
      ["description", "Nome"],
      ["comments", "Informações"],
    ]);

    res.render("accounts", data);
  });

  router.get("/users", authMiddleware, (_, res) => {
    const data = getTableInfo("users", "user", [
      ["id", "ID"],
      ["name", "Nome"],
      ["email", "Email"],
      ["user", "Usuário"],
      ["level", "Tipo"],
      ["status", "Status"],
    ]);

    res.render("users", data);
  });

  router.get("/entries", authMiddleware, (_, res) => {
    const data = getTableInfo("entries", "entry", [
      ["id", "ID"],
      ["type", "Tipo"],
      ["categories", "Categorias"],
      ["description", "Descrição"],
      ["value", "Valor"],
      ["due_date", "Data 1"],
      ["payment_date", "Data 2"],
      ["account", "Conta"],
      ["status", "Status"],
      ["comments", "Possui Comentário"],
    ]);

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

    res.render("entry", { accounts, categories });
  });
}

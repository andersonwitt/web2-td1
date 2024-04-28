import initialAuthMiddleware from "../middlewares/initialAuthMiddleware.js";
import apiAuthMiddleware from "../middlewares/apiAuthMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import express from "express";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const secretKey = "your_secret_key";

const router = express.Router();

router.get("/", initialAuthMiddleware, (_, res) => {
  res.render("index");
});

router.get("/home", authMiddleware, (_, res) => {
  res.render("home", {
    lancamentosDoDia: [{ descricao: "Algo", valor: "R$25,50" }],
  });
});

router.get("/user", authMiddleware, (_, res) => {
  res.render("user");
});

router.get("/category", authMiddleware, (_, res) => {
  res.render("category");
});
router.get("/account", authMiddleware, (_, res) => {
  res.render("account");
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
router.post("/api/login", async (req, res) => {
  const usersJSONString = fs.readFileSync(
    path.join(__dirname, "../data/users.json")
  );
  const users = JSON.parse(usersJSONString);
  const isUserFound = users.find(
    (user) => user.email === req.body.email && req.body.password === user.pwd
  );

  if (isUserFound) {
    jwt.sign(
      { user: isUserFound },
      secretKey,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          res.status(500).json({ error: "Falha ao gerar token" });
        } else {
          res.cookie("auth", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
          });
        }
        res.send({ success: true, message: "" });
      }
    );
  } else {
    res.send({ success: false, message: "Usuário e/ou senha incorreto(s)!" });
  }
});

router.post("/api/user", apiAuthMiddleware, (req, res) => {
  try {
    const usersJSONString = fs.readFileSync(
      path.join(__dirname, "../data/users.json")
    );
    const users = JSON.parse(usersJSONString);

    users.push({
      id: uuid(),
      name: req.body.name,
      email: req.body.email,
      user: req.body.user,
      pwd: req.body.password,
      level: req.body.level,
      status: req.body.status ? "on" : "off",
    });

    fs.writeFileSync(
      path.join(__dirname, "../data/users.json"),
      JSON.stringify(users, null, 2)
    );

    res.send({ success: true, message: "Usuário inserido com sucesso!" });
  } catch {
    res.send({ success: false, message: "Erro ao inserir usuário!" });
  }
});

router.post("/api/category", apiAuthMiddleware, (req, res) => {
  try {
    const categoriesJSONString = fs.readFileSync(
      path.join(__dirname, "../data/categories.json")
    );
    const categories = JSON.parse(categoriesJSONString);

    categories.push({
      id: uuid(),
      description: req.body.description,
      type: req.body.type,
    });

    fs.writeFileSync(
      path.join(__dirname, "../data/categories.json"),
      JSON.stringify(categories, null, 2)
    );

    res.send({ success: true, message: "Categoria inserida com sucesso!" });
  } catch {
    res.send({ success: false, message: "Erro ao inserir categoria!" });
  }
});

router.post("/api/account", apiAuthMiddleware, (req, res) => {
  try {
    const accountsJSONString = fs.readFileSync(
      path.join(__dirname, "../data/accounts.json")
    );
    const accounts = JSON.parse(accountsJSONString);

    accounts.push({
      id: uuid(),
      description: req.body.description,
      comments: req.body.comments,
    });

    fs.writeFileSync(
      path.join(__dirname, "../data/accounts.json"),
      JSON.stringify(accounts, null, 2)
    );

    res.send({ success: true, message: "Conta inserida com sucesso!" });
  } catch {
    res.send({ success: false, message: "Erro ao inserir Conta!" });
  }
});

export default router;

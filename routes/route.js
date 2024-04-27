import initialAuthMiddleware from "../middlewares/initialAuthMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { fileURLToPath } from "url";
import express from "express";
import path from "path";
import fs from "fs";
import apiAuthMiddleware from "../middlewares/apiAuthMiddleware.js";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const secretKey = "your_secret_key";

const router = express.Router();

router.get("/", initialAuthMiddleware, (_, res) => {
  res.render("index");
});

router.get("/home", authMiddleware, (_, res) => {
  res.render("home");
});

router.get("/user", (_, res) => {
  res.render("user");
});

router.get("/category", (_, res) => {
  res.render("category");
});
router.get("/accounts", (_, res) => {
  res.render("accounts");
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
    const cateoriesJSONString = fs.readFileSync(
      path.join(__dirname, "../data/categories.json")
    );
    const categories = JSON.parse(cateoriesJSONString);

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

export default router;

import initialAuthMiddleware from "../middlewares/initialAuthMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { fileURLToPath } from "url";
import express from "express";
import path from "path";
import fs from "fs";
import apiAuthMiddleware from "../middlewares/apiAuthMiddleware.js";
import { v4 as uuid } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      JSON.stringify(users)
    );
    
    res.send({ success: true, message: "Usuário inserido com sucesso!" });
  }catch {
    res.send({success: false, message: 'Erro ao inserir usuário!'})
  }
});

router.post("/api/login", async (req, res) => {
  const usersJSONString = fs.readFileSync(
    path.join(__dirname, "../data/users.json")
  );
  const users = JSON.parse(usersJSONString);
  const isUserFound = users.some(
    (user) => user.email === req.body.email && req.body.password === user.pwd
  );

  if (isUserFound) {
    req.session.isAuthenticated = true;
    res.redirect("/home");
  } else {
    res.send({ success: false, message: "Usuário e/ou senha incorreto(s)!" });
  }
});

export default router;

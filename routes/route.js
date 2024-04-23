import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import initialAuthMiddleware from "../middlewares/initialAuthMiddleware.js";
import fs from 'fs';
import { promisify } from "util";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const pfs = {
  readFileAsync: promisify(fs.readFileSync)
}

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

router.post("/api/login", async (req, res) => {
  const usersJSONString = await pfs.readFileAsync(path.join(__dirname))
  const users = JSON.parse(usersJSONString);
  const isUserFound = users.some(
    (user) => user.email === req.body.email && req.body.password === user.pwd
  );

  if (isUserFound) {
    req.session.isAuthenticated = true;
    res.redirect("/home");
  } else {
    res.status(401).send({ error: "Usuário e/ou senha incorreto(s)!" });
  }
});

export default router;

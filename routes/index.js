const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const initialAuthMiddleware = require("../middlewares/initialAuthMiddleware");

router.get("/", initialAuthMiddleware, (_, res) => {
  res.render("index");
});

router.get("/home", authMiddleware, (_, res) => {
  res.render("home");
});

router.post("/api/login", (req, res) => {
  if (req.body.username === "root" && req.body.password === "unesc@1234") {
    req.session.isAuthenticated = true;
    res.redirect("/home");
  } else {
    res.status(401).send({ error: "Usuário e/ou senha incorreto(s)!" });
  }
});

module.exports = router;

import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import initialAuthMiddleware from "../middlewares/initialAuthMiddleware.js";

const router = express.Router();

router.get("/", initialAuthMiddleware, (_, res) => {
  res.render("index");
});

router.get("/home", authMiddleware, (_, res) => {
  res.render("home");
});

router.get("/user" ,(_, res) => {
  res.render("user");
}); 

router.post("/api/login", (req, res) => {
  if (req.body.username === "root" && req.body.password === "unesc@1234") {
    req.session.isAuthenticated = true;
    res.redirect("/home");
  } else {
    res.status(401).send({ error: "Usuário e/ou senha incorreto(s)!" });
  }
});

export default router;

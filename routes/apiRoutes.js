import apiAuthMiddleware from "../middlewares/apiAuthMiddleware.js";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const secretKey = "your_secret_key";

export const useApiRoutes = (router) => {
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
        status: req.body.status,
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

  router.put("/api/user/:id", apiAuthMiddleware, (req, res) => {
    try {
        const usersJSONString = fs.readFileSync(
          path.join(__dirname, "../data/users.json")
        );
        const users = JSON.parse(usersJSONString);
  
        const userIndex = users.findIndex(
          (item) => item.id === req.params.id
        );
  
        if (userIndex >= 0) {
          users.splice(userIndex, 1, {
            id: req.params.id,
            name: req.body.name,
            email: req.body.email,
            user: req.body.user,
            pwd: req.body.password,
            level: req.body.level,
            status: req.body.status === "on" ? "on" : "off",
          });
  
          fs.writeFileSync(
            path.join(__dirname, "../data/users.json"),
            JSON.stringify(users, null, 2)
          );
          res.send({
            success: true,
            message: "Usuário atualizado com sucesso!",
          });
        } else {
          res.send({ success: false, message: "Usuário não encontrada!" });
        }
      } catch {
        res.send({ success: false, message: "Erro ao atualizar usuário!" });
      }
  });

  router.post("/api/entry", apiAuthMiddleware, (req, res) => {
    try {
      const entriesJSONString = fs.readFileSync(
        path.join(__dirname, "../data/entries.json")
      );
      const entries = JSON.parse(entriesJSONString);

      entries.push({
        id: uuid(),
        type: req.body.type,
        categories: req.body.categories,
        description: req.body.description,
        value: req.body.value,
        due_date: req.body.due_date,
        payment_date: req.body.payment_date,
        account: req.body.account,
        status: req.body.status,
        comments: req.body.comments,
      });

      fs.writeFileSync(
        path.join(__dirname, "../data/entries.json"),
        JSON.stringify(entries, null, 2)
      );

      res.send({
        success: true,
        message: "Entrada/Saída inserida com sucesso!",
      });
    } catch {
      res.send({ success: false, message: "Erro ao inserir entrada/saída!" });
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

  router.put("/api/category/:id", apiAuthMiddleware, (req, res) => {
    try {
      const categoriesJSONString = fs.readFileSync(
        path.join(__dirname, "../data/categories.json")
      );
      const categories = JSON.parse(categoriesJSONString);

      const categoryIndex = categories.findIndex(
        (item) => item.id === req.params.id
      );

      if (categoryIndex >= 0) {
        categories.splice(categoryIndex, 1, {
          id: req.params.id,
          description: req.body.description,
          type: req.body.type,
        });

        fs.writeFileSync(
          path.join(__dirname, "../data/categories.json"),
          JSON.stringify(categories, null, 2)
        );
        res.send({
          success: true,
          message: "Categoria atualizada com sucesso!",
        });
      } else {
        res.send({ success: false, message: "Categoria não encontrada!" });
      }
    } catch {
      res.send({ success: false, message: "Erro ao atualizar categoria!" });
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

  router.put("/api/account/:id", apiAuthMiddleware, (req, res) => {
    try {
      const accountsJSONString = fs.readFileSync(
        path.join(__dirname, "../data/accounts.json")
      );
      const accounts = JSON.parse(accountsJSONString);

      const accountIndex = accounts.findIndex(
        (item) => item.id === req.params.id
      );

      if (accountIndex >= 0) {
        accounts.splice(accountIndex, 1, {
          id: req.params.id,
          description: req.body.description,
          comments: req.body.comments,
        });

        fs.writeFileSync(
          path.join(__dirname, "../data/accounts.json"),
          JSON.stringify(accounts, null, 2)
        );
        res.send({ success: true, message: "Conta atualizada com sucesso!" });
      } else {
        res.send({ success: false, message: "Conta não encontrada!" });
      }
    } catch {
      res.send({ success: false, message: "Erro ao atualizar conta!" });
    }
  });
};

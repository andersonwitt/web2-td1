import express from "express";
import bodyParser from "body-parser";
import { useApiRoutes } from "./routes/apiRoutes.js";
import { useClientRoutes } from "./routes/clientRoutes.js";

const PORT = process.env.PORT || 8000;
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));

useApiRoutes(router);
useClientRoutes(router);

app.use("/", router);

app.listen(PORT, () => {
  console.log(
    `Servidor iniciado na porta ${PORT} no endereço http://localhost:${PORT}`
  );
});

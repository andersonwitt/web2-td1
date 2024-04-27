import express from "express";
import indexRouter from "./routes/route.js";
import bodyParser from "body-parser";
import session from "express-session";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  session({
    secret: "12345",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT} no endereço http://localhost:${PORT}`);
});

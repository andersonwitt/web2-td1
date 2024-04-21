const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index");
const bodyParser = require("body-parser");
const session = require("express-session");

const PORT = process.env.PORT || 8080;
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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

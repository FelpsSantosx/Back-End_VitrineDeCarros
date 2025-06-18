require("dotenv").config();

const express = require("express");
const Databse = require("./src/config/db");
const cors = require("cors");

const app = express();

app.use(express.json());

const origins =
  process.env.NODE_ENV === "development" // alterar para "production" quando for para em produção
    ? [process.env.PROD_URL]
    : [process.env.DEV_URL];

app.use(
  cors({
    origin: origins, 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Ola, Express!");
});

// Importações de Rotas
const carRoutes = require("./src/routes/carRoutes");
const messageRoutes = require("./src/routes/messageRoutes");

// Definindo as rotas
app.use("/", carRoutes);
app.use("/messages", messageRoutes);

Databse.connect().then(() => {
  const PORT = process.env.PORT || 3000;

  setTimeout(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta: ${PORT}`);
    });
  }, 1200);
});

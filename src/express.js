require("express-async-errors");

const express = require("express");

const errorHandlerMiddleware = require("./middleware/error-handler");
const pageNotFound = require("./middleware/404");
const productsRoutes = require("./routes/products");

const app = express();

// Middlewares
app.use(express.json());

// NOTE: Routes=> Order matters
app.get("/", (req, res) => {
  res.send(
    "<h1>Store page</h1><a href='localhost:3000/api/v1/products'>Products list</a>"
  );
});

app.use("/api/v1/products", productsRoutes);

app.use(pageNotFound);
app.use(errorHandlerMiddleware);

module.exports = app;

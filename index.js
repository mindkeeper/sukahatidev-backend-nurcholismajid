require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const responseMiddleware = require("./src/middlewares/response");
const mainRoutes = require("./src/routes");
const { sequelize } = require("./src/models");
const app = express();

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cors({ origin: "*" }));
app.use(express.raw());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseMiddleware);
app.use(mainRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(8080, () => console.log("connected at PORT 8080"));
  })
  .catch((err) => {
    console.log(err);
  });

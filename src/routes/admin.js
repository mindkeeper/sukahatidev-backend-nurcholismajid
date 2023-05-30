const getBrandHandler = require("../controllers/admin/getBrand");
const getTransactionHandler = require("../controllers/admin/getTransaction");

const Route = require("express").Router();

Route.get("/brands/:id", getBrandHandler);
Route.get("/transactions/:id", getTransactionHandler);

module.exports = Route;

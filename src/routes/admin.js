const getTransactionHandler = require("../controllers/admin/getTransaction");
const getUserHandler = require("../controllers/admin/getUser");

const Route = require("express").Router();

Route.get("/user/:id", getUserHandler);
Route.get("/transaction/:id", getTransactionHandler);

module.exports = Route;

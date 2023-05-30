const cancelTransactionHandler = require("../controllers/transaction/cancelTransaction");
const createTransactionHandler = require("../controllers/transaction/createTransaction");
const isLogin = require("../middlewares/authorization");

const Route = require("express").Router();

Route.post("/new", isLogin, createTransactionHandler);
Route.patch("/cancel/:id", isLogin, cancelTransactionHandler);
module.exports = Route;

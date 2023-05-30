const createTransactionHandler = require("../controllers/transaction/createTransaction");
const isLogin = require("../middlewares/authorization");

const Route = require("express").Router();

Route.post("/new", isLogin, createTransactionHandler);
module.exports = Route;

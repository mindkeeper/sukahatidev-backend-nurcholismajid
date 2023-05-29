const createTransactionHandler = require("../controllers/createTransactions");
const loginHandler = require("../controllers/login");
const registerHandler = require("../controllers/register");

const Route = require("express").Router();

// Route.post("/new", createTransactionHandler);
module.exports = Route;

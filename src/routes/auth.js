const loginHandler = require("../controllers/login");
const registerHandler = require("../controllers/register");

const Route = require("express").Router();

Route.post("/register", registerHandler);
Route.post("/login", loginHandler);
module.exports = Route;

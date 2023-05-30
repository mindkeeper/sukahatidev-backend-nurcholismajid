const loginHandler = require("../controllers/auth/login");
const registerHandler = require("../controllers/auth/register");

const Route = require("express").Router();

Route.post("/register", registerHandler);
Route.post("/login", loginHandler);
module.exports = Route;

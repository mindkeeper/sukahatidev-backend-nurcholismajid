const getUserHandler = require("../controllers/admin/getUser");

const Route = require("express").Router();

Route.get("/user/:id", getUserHandler);

module.exports = Route;

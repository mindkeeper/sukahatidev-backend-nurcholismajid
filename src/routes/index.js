const mainRoutes = require("express").Router();
const authRouter = require("./auth");
const transactionRouter = require("./transaction");
const adminRouter = require("./admin");

const prefix = "/api";

mainRoutes.use(`${prefix}/auth`, authRouter);
mainRoutes.use(`${prefix}/transactions`, transactionRouter);
mainRoutes.use(`${prefix}/admin`, adminRouter);

mainRoutes.get("/", (req, res) => res.status(200).json({ msg: "welcome" }));
module.exports = mainRoutes;

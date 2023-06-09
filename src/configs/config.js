require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_NAME_DEV,
    host: process.env.DB_HOST_DEV,
    dialect: "postgres",
  },

  production: {
    username: process.env.DB_USERNAME_DEPLOY,
    password: process.env.DB_PASSWORD_DEPLOY,
    database: process.env.DB_NAME_DEPLOY,
    host: process.env.DB_HOST_DEPLOY,
    dialect: "postgres",
  },
};

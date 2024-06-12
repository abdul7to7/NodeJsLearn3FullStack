const sequelize = require("sequelize");

const sq = new sequelize("expense-database", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sq;

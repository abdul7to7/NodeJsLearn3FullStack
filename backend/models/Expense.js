const sequelize = require("sequelize");

const sq = require("../util/database");

const Expense = sq.define("expense", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: sequelize.STRING,
    allowNull: false,
  },
  category: sequelize.STRING,
});

module.exports = Expense;

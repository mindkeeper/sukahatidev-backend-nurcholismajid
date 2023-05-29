"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Substation, Product, TransactionItem }) {
      // define association here

      this.belongsTo(Substation, { foreignKey: "substation_id" });
      this.belongsToMany(Product, {
        through: TransactionItem,
        foreignKey: "transaction_id",
      });
    }
  }
  Transactions.init(
    {
      status: {
        type: DataTypes.ENUM("Pending", "Cancelled", "Paid", "Success"),
        allowNull: false,
        defaultValue: "Pending",
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      tableName: "transactions",
      underscored: true,
      paranoid: true,
    }
  );
  return Transactions;
};

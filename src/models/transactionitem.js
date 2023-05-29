"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Transaction, Product }) {
      // define association here
      this.belongsTo(Product, { foreignKey: "product_id" });
      this.belongsTo(Transaction, { foreignKey: "transaction_id" });
    }
  }
  TransactionItems.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: 10,
            msg: "minimum order is 10",
          },
          notNull: {
            msg: "quantity is required",
          },
        },
      },
      subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "quantity is required",
          },
        },
      },
      product_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "Product",
          key: "id",
        },
        validate: {
          notNull: {
            msg: "product id cannot be empty",
          },
        },
      },
      transaction_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "Transaction",
          key: "id",
        },
        validate: {
          notNull: {
            msg: "transaction id cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "TransactionItem",
      tableName: "transaction_items",
      underscored: true,
      paranoid: true,
    }
  );
  return TransactionItems;
};

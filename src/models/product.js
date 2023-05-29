"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Transaction, TransactionItem }) {
      this.belongsToMany(Transaction, {
        through: TransactionItem,
        foreignKey: "product_id",
      });
    }
  }
  Products.init(
    {
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 150],
            msg: "product name must be 5-150 characters",
          },
          notNull: {
            msg: "product name is required",
          },
        },
      },
      classification: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 50],
            msg: "product classification must be 1-50 characters",
          },
          notNull: {
            msg: "product classification is required",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [4, 150],
            msg: "product type must be 4-150 characters",
          },
          notNull: {
            msg: "product type is required",
          },
        },
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 15],
            msg: "product unit must be 1,15 characters",
          },
          notNull: {
            msg: "product unit is required",
          },
        },
      },
      multiplier: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notNull: {
            msg: "product multiplier is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "product price is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      underscored: true,
      paranoid: true,
    }
  );
  return Products;
};

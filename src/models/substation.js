"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Substations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Brand, Transaction, City }) {
      this.belongsTo(Brand, { foreignKey: "brand_id" });
      this.hasMany(Transaction, { foreignKey: "substation_id" });
      this.belongsTo(City)
    }
  }
  Substations.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [4, 30],
            msg: "substation name must be 4-30 characters",
          },
          notNull: {
            msg: "substation name is required",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Phone number already taken",
        },
        validate: {
          is: {
            args: /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
            msg: "invalid phone number format",
          },
          notNull: {
            msg: "phone number is required",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [15, 150],
            msg: "address must be 15-150 characters",
          },
          notNull: {
            msg: "address is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Substation",
      tableName: "substations",
      underscored: true,
      paranoid:true,
    }
  );
  return Substations;
};

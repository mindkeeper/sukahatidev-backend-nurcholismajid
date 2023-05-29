"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Brands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Substation }) {
      this.hasOne(User, { foreignKey: "brand_id" });
      this.hasMany(Substation, { foreignKey: "brand_id" });
    }
  }
  Brands.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 30],
            msg: "brand name must be 4-30 characters",
          },
          notNull: {
            msg: "brand name is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Brand",
      tableName: "brands",
      underscored: true,
      paranoid: true,
    }
  );
  return Brands;
};

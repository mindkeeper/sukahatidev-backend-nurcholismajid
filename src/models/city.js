"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Substation }) {
      // define association here
      this.hasMany(Substation);
    }
  }
  City.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [4, 30],
            msg: "city name must be 4-30 characters long",
          },
          notNull: {
            args: "city name is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "City",
      tableName: "cities",
      underscored: true,
      paranoid: true,
    }
  );
  return City;
};

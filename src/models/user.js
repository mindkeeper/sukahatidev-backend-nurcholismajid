"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Brand, Token }) {
      // define association here
      this.belongsTo(Brand, { foreignKey: "brand_id" });
      this.hasOne(Token, { foreignKey: "user_id" });
    }
  }
  Users.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "email already taken!",
        },
        validate: {
          isEmail: {
            args: true,
            msg: "incorrect email format",
          },
          notNull: {
            msg: "email is required",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "username already taken!",
        },
        validate: {
          isLowercase: {
            args: true,
            msg: "username must be lowercase",
          },
          len: {
            args: [6, 20],
            msg: "username must be 6-20 characters",
          },
          notNull: {
            msg: "username is required",
          },
        },
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: true,
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
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      brand_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Brand",
          key: "id",
        },
        validate: {
          notNull: {
            msg: "brand id cannot be empty",
          },
        },
      },
    },

    {
      sequelize,
      modelName: "User",
      tableName: "users",
      paranoid: true,
      underscored: true,
    }
  );
  return Users;
};

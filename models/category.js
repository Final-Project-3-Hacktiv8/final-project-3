"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Product);
    }
  }
  Category.init(
    {
      type: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Type cannot be empty",
          },
        },
      },
      sold_product_amount: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "Sold product amount cannot be empty",
          },
          isNumeric: {
            args: true,
            msg: "Sold product amount must be a number",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
      hooks: {
        beforeCreate: (instance, options) => {
          instance.sold_product_amount = 0;
        },
      },
    }
  );
  return Category;
};

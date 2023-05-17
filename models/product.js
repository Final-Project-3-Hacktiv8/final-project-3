'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.TransactionHistory, {foreignKey: 'ProductId'})
    }
  }
  Product.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Price must be a number'
        },
        min: {
          args: [0],
          msg: 'Price cannot be less than 0'
        },
        max: {
          args: [50000000],
          msg: 'Price cannot be more than 50.000.000'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args:true,
          msg: 'Stock cannot be empty'
        },
        isNumeric: {
          args: true,
          msg : 'Stock must be a number'
        },
        min : {
          args: [5],
          msg: 'Stock cannot be less than 0'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
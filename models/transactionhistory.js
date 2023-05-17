'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        TransactionHistory.belongsTo(models.Product, {foreignKey: 'ProductId'})
        TransactionHistory.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  }
  TransactionHistory.init({
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Quantity cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Quantity must be a number'
        }
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Total price cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Total price must be a number'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'TransactionHistory',
  });
  return TransactionHistory;
};
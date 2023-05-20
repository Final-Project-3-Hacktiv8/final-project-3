'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { use } = require('../routers/userRouters');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.TransactionHistory, {foreignKey: 'UserId'})
    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Full name cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        isEmail: {
          args: true,
          msg: 'Email format is wrong'
        },
      },
      unique: {
        args: true,
        msg: 'Email already exists'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        len: {
          args: [6, 10],
          msg: 'Password must be between 6-10 characters',
        },
        
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Gender cannot be empty'
        },
        isIn: {
          args : [['male', 'female']],
          msg : "Gender must be 'male'or 'female'"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Role cannot be empty'
        },
        isIn: {
          args: [['admin', 'customer']],
          msg: "Role must be either 'admin' or 'customer'"
        }
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Balance cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Balance must be a number'
        },
        min: {
          args: [0],
          msg: 'Balance cannot be negative'
        },
        max : {
          args : [1000000000],
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      },
      beforeUpdate: (user, options) => {
        user.password = hashPassword(user.password)
      },
      //set balance to 0 when for role user
      beforeValidate: (user, options) => {
        if(user.role === 'customer') {
          user.balance = 0
        }
        // user.password = hashPassword(user.password)
      }, 
    }
    
  });
  return User;
};
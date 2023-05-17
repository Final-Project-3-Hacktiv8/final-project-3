'use strict';

const data = [
  {
    ProductId: 1,
    UserId : 1,
    quantity: 1,
    total_price: 100000,
    createdAt: new Date(),
    updatedAt: new Date()

  },
  {
    ProductId: 2,
    UserId : 1,
    quantity: 1,
    total_price: 100000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    ProductId: 3,
    UserId : 1,
    quantity: 1,
    total_price: 100000,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TransactionHistories', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TransactionHistories', null, {})
  }
};

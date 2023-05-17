'use strict';

const data = [
  {
    type: 'materials',
    sold_product_amount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    type: 'Shirt',
    sold_product_amount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    type: 'Pants',
    sold_product_amount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    type: 'electronics',
    sold_product_amount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};

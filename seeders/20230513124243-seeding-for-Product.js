'use strict';

const data = [
  {
    title: 'Baju',
    price: 100000,
    stock: 10,
    CategoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date()

  },
  {
    title: 'Celana',
    price: 100000,
    stock: 10,
    CategoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title : 'semen',
    price : 50000,
    stock : 100,
    CategoryId : 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title : 'handphone',
    price : 2999999,
    stock : 30,
    CategoryId : 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', data, {})
  }
};

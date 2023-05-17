'use strict';
const hashPassword = require('../helpers/bcrypt').hashPassword

const data = {
  full_name: 'admin',
  email: 'admin@mail.com',
  password: hashPassword('admin'),
  role : 'admin',
  balance : 1000000,
  gender : 'male',
  createdAt: new Date(),
  updatedAt: new Date()
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [data], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Categories', {
      fields: ['type'],
      type: 'unique',
      name: 'unique_type'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Categories', 'unique_type')
  }
};

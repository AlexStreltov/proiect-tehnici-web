'use strict';
const faker = require("faker");

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];
    for(let i = 0; i < 10; i++) {
      data.push({
        description: faker.lorem.words(3),
        creationDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('VirtualShelves', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

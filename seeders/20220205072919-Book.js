'use strict';

const faker = require("faker");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const data = [];
     for(let i = 0; i < 100; i++) {
       data.push({
         shelfId: faker.datatype.number({min: 1, max: 10}),
         title: faker.lorem.words(5),
         url: faker.internet.url(),
         genre: faker.random.arrayElement(['TRAGEDY', 'COMEDY', 'ADVENTURE', 'MISTERY']),
         createdAt: new Date(),
         updatedAt: new Date()
       });
     }
 
     await queryInterface.bulkInsert('Books', data, {});
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

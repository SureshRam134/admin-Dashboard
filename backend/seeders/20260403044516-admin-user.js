'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        roleId:1,
        name:"super admin",
        email:"superadmin@gmail.com",
        password: await bcrypt.hash("Superadmin@1", 10),
        active:false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId:2,
        name:"admin",
        email:"admin@gmail.com",
        password: await bcrypt.hash("Admintest@1", 10),
        active:false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {email:["superadmin@gmail.com","admin@gmail.com"]})
  }
};

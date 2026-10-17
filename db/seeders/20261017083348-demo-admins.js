'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const passwordHash = await bcrypt.hash('Admin@12345', 10);

    await queryInterface.bulkInsert('admin', [
      {
        username: 'superadmin',
        password_hash: passwordHash,
        role: 'SuperAdmin',
        created_at: new Date(),
      },
      {
        username: 'editor1',
        password_hash: passwordHash,
        role: 'ContentEditor',
        created_at: new Date(),
      },
      {
        username: 'editor2',
        password_hash: passwordHash,
        role: 'ContentEditor',
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('admin', {
      username: ['superadmin', 'editor1', 'editor2'],
    });
  },
};
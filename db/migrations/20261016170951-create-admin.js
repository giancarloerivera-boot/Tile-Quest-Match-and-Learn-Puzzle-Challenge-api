'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admin', {
      admin_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Unique ID of the administrator',
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        comment: 'Administrator username for login',
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Encrypted authentication key',
      },
      role: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'ContentEditor',
        comment: 'Access privilege level (SuperAdmin, ContentEditor)',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('admin');
  },
};
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('level', {
      level_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Unique level identifier',
      },
      level_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        comment: 'Display/order number of the level',
      },
      difficulty: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'Easy',
        comment: 'Difficulty label (Easy, Medium, Hard)',
      },
      tile_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 16,
        comment: 'Number of tiles in the grid',
      },
      time_limit: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Quiz time limit in seconds (NULL = no timer)',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('level');
  },
};
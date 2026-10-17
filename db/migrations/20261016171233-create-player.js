'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('player', {
      player_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Unique player account identifier',
      },
      player_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        comment: 'User display name',
      },
      total_score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Cumulative points earned across all levels',
      },
      current_level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: 'Highest level number unlocked by the player',
      },
      lives: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 3,
        comment: 'Remaining lives/attempts',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('player');
  },
};
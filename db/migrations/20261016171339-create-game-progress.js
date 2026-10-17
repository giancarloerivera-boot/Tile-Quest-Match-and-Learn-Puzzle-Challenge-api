'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('game_progress', {
      progress_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Progress record ID',
      },
      player_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'player', key: 'player_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'Reference to the active player',
      },
      level_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'level', key: 'level_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'Level this progress record refers to',
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Points earned on this level',
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'true = puzzle and quiz passed',
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addConstraint('game_progress', {
      fields: ['player_id', 'level_id'],
      type: 'unique',
      name: 'uq_progress_player_level',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('game_progress');
  },
};
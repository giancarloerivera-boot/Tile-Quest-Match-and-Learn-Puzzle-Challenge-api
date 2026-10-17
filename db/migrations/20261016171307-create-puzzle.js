'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('puzzle', {
      puzzle_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Unique puzzle identifier',
      },
      level_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'level', key: 'level_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'Level this puzzle belongs to',
      },
      required_pairs: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Number of tile pairs that must be matched',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('puzzle');
  },
};
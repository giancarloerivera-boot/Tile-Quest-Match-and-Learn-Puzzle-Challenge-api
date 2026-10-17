'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('question', {
      question_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Unique question key',
      },
      level_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'level', key: 'level_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'Associated game level',
      },
      question_text: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Text shown in the quiz modal',
      },
      answer: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Correct answer choice',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('question');
  },
};
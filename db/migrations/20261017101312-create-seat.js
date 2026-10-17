'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('seat', {
      seat_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      session_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'game_session', key: 'session_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'user_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nickname: { type: Sequelize.STRING(100), allowNull: false },
      score: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      completed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, comment: 'true = answered every question' },
    });

    await queryInterface.addConstraint('seat', {
      fields: ['session_id', 'user_id'],
      type: 'unique',
      name: 'uq_seat_session_user',
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('seat');
  },
};
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('game_session', {
      session_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      session_code: { type: Sequelize.STRING(6), allowNull: false, unique: true, comment: 'Six-digit join code' },
      status: { type: Sequelize.STRING(20), allowNull: false, defaultValue: 'OPEN', comment: 'OPEN or CLOSED' },
      started_at: { type: Sequelize.DATE, allowNull: true },
      ended_at: { type: Sequelize.DATE, allowNull: true },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('game_session');
  },
};
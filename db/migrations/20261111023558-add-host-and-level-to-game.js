'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Module 1: every level has an owner (a host).
    await queryInterface.addColumn('level', 'host_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'users', key: 'user_id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    // Module 2: a game has a host, plays one level, and has a size limit.
    await queryInterface.addColumn('game_session', 'host_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'users', key: 'user_id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await queryInterface.addColumn('game_session', 'level_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'level', key: 'level_id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT', // a level used by a game cannot be deleted (409)
    });
    await queryInterface.addColumn('game_session', 'max_players', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 30,
    });

    // Two players in one game cannot share a nickname.
    await queryInterface.addConstraint('seat', {
      fields: ['session_id', 'nickname'],
      type: 'unique',
      name: 'uq_seat_nickname',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('seat', 'uq_seat_nickname');
    await queryInterface.removeColumn('game_session', 'max_players');
    await queryInterface.removeColumn('game_session', 'level_id');
    await queryInterface.removeColumn('game_session', 'host_id');
    await queryInterface.removeColumn('level', 'host_id');
  },
};
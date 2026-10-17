'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'email', {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
      defaultValue: '',
    });
    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: 'STUDENT',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'role');
    await queryInterface.removeColumn('users', 'email');
  },
};
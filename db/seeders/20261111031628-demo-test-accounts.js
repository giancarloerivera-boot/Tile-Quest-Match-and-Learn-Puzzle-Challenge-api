'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      { school_id: '2099-0001', full_name: 'Demo Host One', email: 'host1@tilequest.test', role: 'HOST' },
      { school_id: '2099-0002', full_name: 'Demo Player One', email: 'player1@tilequest.test', role: 'PLAYER' },
      { school_id: '2099-0003', full_name: 'Demo Host Two', email: 'host2@tilequest.test', role: 'HOST' },
      { school_id: '2099-0004', full_name: 'Demo Player Two', email: 'player2@tilequest.test', role: 'PLAYER' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      school_id: ['2099-0001', '2099-0002', '2099-0003', '2099-0004'],
    });
  },
};
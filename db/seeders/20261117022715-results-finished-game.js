'use strict';

module.exports = {
  async up(queryInterface) {
    const { sequelize } = queryInterface;

    // Three players who finish the game.
    await queryInterface.bulkInsert('users', [
      { school_id: '2099-0101', full_name: 'Demo Finisher One', email: 'finisher1@tilequest.test', role: 'PLAYER' },
      { school_id: '2099-0102', full_name: 'Demo Finisher Two', email: 'finisher2@tilequest.test', role: 'PLAYER' },
      { school_id: '2099-0103', full_name: 'Demo Finisher Three', email: 'finisher3@tilequest.test', role: 'PLAYER' },
    ]);

    const [hosts] = await sequelize.query("SELECT user_id FROM users WHERE school_id = '2099-0001'");

    // One game that has ended. The join code is six digits and does not start with 0.
    await queryInterface.bulkInsert('game_session', [{
      session_code: '482913',
      status: 'CLOSED',
      host_id: hosts[0].user_id,
      max_players: 30,
      started_at: new Date('2026-11-10T09:00:00Z'),
      ended_at: new Date('2026-11-10T09:20:00Z'),
    }]);

    const [sessions] = await sequelize.query("SELECT session_id FROM game_session WHERE session_code = '482913'");
    const [players] = await sequelize.query(
      "SELECT user_id, school_id FROM users WHERE school_id IN ('2099-0101', '2099-0102', '2099-0103') ORDER BY school_id"
    );

    const nicknames = ['TileNora', 'MatchAlex', 'PuzzleMaya'];
    const scores = [900, 750, 600];
    await queryInterface.bulkInsert('seat', players.map((p, i) => ({
      session_id: sessions[0].session_id,
      user_id: p.user_id,
      nickname: nicknames[i],
      score: scores[i],
      completed: true,
    })));
  },

  async down(queryInterface) {
    const { sequelize } = queryInterface;
    await sequelize.query("DELETE FROM seat WHERE session_id IN (SELECT session_id FROM game_session WHERE session_code = '482913')");
    await sequelize.query("DELETE FROM game_session WHERE session_code = '482913'");
    await sequelize.query("DELETE FROM users WHERE school_id IN ('2099-0101', '2099-0102', '2099-0103')");
  },
};
'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const start = new Date(now.getTime() - 30 * 60 * 1000);

    await queryInterface.bulkInsert('users', [
  { school_id: '2023-0001', full_name: 'Demo Student One',   email: 'student1@example.com', role: 'STUDENT', created_at: now },
  { school_id: '2023-0002', full_name: 'Demo Student Two',   email: 'student2@example.com', role: 'STUDENT', created_at: now },
  { school_id: '2023-0003', full_name: 'Demo Student Three', email: 'student3@example.com', role: 'STUDENT', created_at: now },
]);
    await queryInterface.bulkInsert('game_session', [
      { session_code: '482915', status: 'CLOSED', started_at: start, ended_at: now },
    ]);

    const [[session]] = await queryInterface.sequelize.query(
      `SELECT session_id FROM game_session WHERE session_code = '482915';`
    );
    const [users] = await queryInterface.sequelize.query(
      `SELECT user_id, school_id FROM users ORDER BY user_id;`
    );

    const seats = [
  { nickname: 'TileNinja',  score: 900, completed: true },
  { nickname: 'QuizWhiz',   score: 650, completed: true },
  { nickname: 'NewbieNora', score: 500, completed: true },
];

    await queryInterface.bulkInsert(
      'seat',
      users.map((u, i) => ({
        session_id: session.session_id,
        user_id: u.user_id,
        ...seats[i],
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('seat', null, {});
    await queryInterface.bulkDelete('game_session', { session_code: '482915' });
    await queryInterface.bulkDelete('users', {
      school_id: ['2023-0001', '2023-0002', '2023-0003'],
    });
  },
};
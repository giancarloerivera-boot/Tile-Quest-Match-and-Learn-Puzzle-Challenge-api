'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('level', [
      { level_number: 1, difficulty: 'Easy', tile_count: 12, time_limit: null },
      { level_number: 2, difficulty: 'Easy', tile_count: 16, time_limit: null },
      { level_number: 3, difficulty: 'Easy', tile_count: 16, time_limit: 120 },
      { level_number: 4, difficulty: 'Medium', tile_count: 20, time_limit: 120 },
      { level_number: 5, difficulty: 'Medium', tile_count: 20, time_limit: 100 },
      { level_number: 6, difficulty: 'Medium', tile_count: 24, time_limit: 100 },
      { level_number: 7, difficulty: 'Hard', tile_count: 24, time_limit: 90 },
      { level_number: 8, difficulty: 'Hard', tile_count: 30, time_limit: 90 },
      { level_number: 9, difficulty: 'Hard', tile_count: 36, time_limit: 75 },
      { level_number: 10, difficulty: 'Hard', tile_count: 36, time_limit: 60 },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('level', {
      level_number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    });
  },
};
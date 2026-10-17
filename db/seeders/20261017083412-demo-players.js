'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('player', [
      {
        player_name: 'AlexTheExplorer',
        total_score: 1250,
        current_level: 4,
        lives: 3,
        created_at: new Date(),
      },
      {
        player_name: 'PuzzleMaster99',
        total_score: 3400,
        current_level: 8,
        lives: 2,
        created_at: new Date(),
      },
      {
        player_name: 'TileNinja',
        total_score: 780,
        current_level: 3,
        lives: 1,
        created_at: new Date(),
      },
      {
        player_name: 'NewbieNora',
        total_score: 0,
        current_level: 1,
        lives: 3,
        created_at: new Date(),
      },
      {
        player_name: 'QuizWhiz',
        total_score: 2100,
        current_level: 6,
        lives: 3,
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('player', {
      player_name: [
        'AlexTheExplorer',
        'PuzzleMaster99',
        'TileNinja',
        'NewbieNora',
        'QuizWhiz',
      ],
    });
  },
};
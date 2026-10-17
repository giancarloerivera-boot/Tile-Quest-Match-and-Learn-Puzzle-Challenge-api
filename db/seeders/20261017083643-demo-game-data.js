'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // ---------- Look up levels ----------
    const [levels] = await queryInterface.sequelize.query(
      'SELECT level_id, level_number, tile_count FROM "level" ORDER BY level_number;'
    );
    if (levels.length === 0) {
      throw new Error('No levels found. Run the demo-levels seeder first.');
    }

    const idByNumber = {};
    levels.forEach((l) => {
      idByNumber[l.level_number] = l.level_id;
    });

    // ---------- Look up players ----------
    const [players] = await queryInterface.sequelize.query(
      'SELECT player_id, player_name, total_score, current_level FROM "player" ORDER BY player_id;'
    );
    if (players.length === 0) {
      throw new Error('No players found. Run the demo-players seeder first.');
    }

    // ---------- 1. Puzzles: one per level ----------
    const puzzles = levels.map((level) => ({
      level_id: level.level_id,
      required_pairs: level.tile_count / 2,
    }));
    await queryInterface.bulkInsert('puzzle', puzzles);

    // ---------- 2. Questions: two per level ----------
    const questionData = [
      [1, 'What is the capital of France?', 'Paris'],
      [1, 'How many days are in a week?', '7'],
      [2, 'Which planet is known as the Red Planet?', 'Mars'],
      [2, 'What color do you get by mixing blue and yellow?', 'Green'],
      [3, 'What is 8 x 7?', '56'],
      [3, 'Which animal is the largest mammal?', 'Blue whale'],
      [4, 'What is the chemical symbol for water?', 'H2O'],
      [4, 'Who wrote "Romeo and Juliet"?', 'William Shakespeare'],
      [5, 'What is the largest ocean on Earth?', 'Pacific Ocean'],
      [5, 'How many continents are there?', '7'],
      [6, 'What gas do plants absorb from the air?', 'Carbon dioxide'],
      [6, 'What is the square root of 144?', '12'],
      [7, 'In which year did World War II end?', '1945'],
      [7, 'What is the hardest natural substance?', 'Diamond'],
      [8, 'Which country has the largest population?', 'India'],
      [8, 'What is the smallest prime number?', '2'],
      [9, 'What is the longest river in the world?', 'Nile'],
      [9, 'Which organ pumps blood through the body?', 'Heart'],
      [10, 'What is the speed of light in km per second (approx.)?', '300,000'],
      [10, 'Who painted the Mona Lisa?', 'Leonardo da Vinci'],
    ];

    const questions = questionData.map(([levelNumber, text, answer]) => {
      if (!idByNumber[levelNumber]) {
        throw new Error(`Level ${levelNumber} not found.`);
      }
      return {
        level_id: idByNumber[levelNumber],
        question_text: text,
        answer: answer,
      };
    });
    await queryInterface.bulkInsert('question', questions);

    // ---------- 3. Game progress ----------
    // For each player: levels 1..(current_level - 1) are completed,
    // and their total_score is split across those levels.
    // The current level is in progress (score 0, not completed).
    const progress = [];
    const now = new Date();

    players.forEach((player) => {
      const completedCount = player.current_level - 1;

      if (completedCount > 0) {
        const base = Math.floor(player.total_score / completedCount);
        const remainder = player.total_score - base * completedCount;

        for (let n = 1; n <= completedCount; n++) {
          if (!idByNumber[n]) {
            throw new Error(`Level ${n} not found.`);
          }
          progress.push({
            player_id: player.player_id,
            level_id: idByNumber[n],
            score: n === completedCount ? base + remainder : base,
            completed: true,
            updated_at: now,
          });
        }
      }

      if (!idByNumber[player.current_level]) {
        throw new Error(`Level ${player.current_level} not found.`);
      }
      progress.push({
        player_id: player.player_id,
        level_id: idByNumber[player.current_level],
        score: 0,
        completed: false,
        updated_at: now,
      });
    });

    await queryInterface.bulkInsert('game_progress', progress);
  },

  async down(queryInterface) {
    // Delete in reverse order of insertion
    await queryInterface.bulkDelete('game_progress', null, {});
    await queryInterface.bulkDelete('question', null, {});
    await queryInterface.bulkDelete('puzzle', null, {});
  },
};
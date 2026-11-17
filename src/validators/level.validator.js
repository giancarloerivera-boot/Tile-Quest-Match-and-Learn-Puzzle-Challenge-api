const { body, param } = require('express-validator');

const idParam = param('id')
  .isInt({ min: 1 }).withMessage('id must be a positive whole number')
  .toInt();

const levelNumber = () => body('level_number')          // level_number INTEGER NOT NULL UNIQUE
  .exists().withMessage('level_number is required')
  .bail()
  .isInt({ min: 1, max: 1000 }).withMessage('level_number must be a whole number from 1 to 1000')
  .toInt();

const difficulty = () => body('difficulty')              // difficulty VARCHAR(50) DEFAULT 'Easy'
  .optional()
  .isString().withMessage('difficulty must be text')
  .bail()
  .trim()
  .isIn(['Easy', 'Medium', 'Hard']).withMessage('difficulty must be Easy, Medium or Hard');

const tileCount = () => body('tile_count')               // tile_count INTEGER DEFAULT 16
  .optional()
  .isInt({ min: 4, max: 64 }).withMessage('tile_count must be a whole number from 4 to 64')
  .toInt();

const timeLimit = () => body('time_limit')               // time_limit INTEGER, may be NULL
  .optional({ values: 'null' })
  .isInt({ min: 10, max: 3600 }).withMessage('time_limit must be a whole number of seconds from 10 to 3600')
  .toInt();

const createRules = [levelNumber(), difficulty(), tileCount(), timeLimit()];

// PATCH changes only what is sent: every field is optional, but not all of them at once.
const updateRules = [
  idParam,
  levelNumber().optional(),
  difficulty(),
  tileCount(),
  timeLimit(),
  body().custom((value) => {
    const sent = Object.keys(value || {});
    const allowed = ['level_number', 'difficulty', 'tile_count', 'time_limit'];
    if (!sent.some((key) => allowed.includes(key))) {
      throw new Error('send at least one of: level_number, difficulty, tile_count, time_limit');
    }
    return true;
  }),
];

module.exports = { idParam, createRules, updateRules };
const { body, param } = require('express-validator');

// Hub Contract rule 5: a join code is six digits and does not start with 0.
const codeParam = param('code')
  .matches(/^[1-9][0-9]{5}$/).withMessage('the join code must be six digits');

const createRules = [
  body('level_id')                       // level_id INTEGER, may be empty
    .optional({ values: 'null' })
    .isInt({ min: 1 }).withMessage('level_id must be a positive whole number')
    .toInt(),
  body('max_players')                    // max_players INTEGER DEFAULT 30
    .optional()
    .isInt({ min: 2, max: 100 }).withMessage('max_players must be a whole number from 2 to 100')
    .toInt(),
];

const statusRules = [
  codeParam,
  body('status')
    .exists().withMessage('status is required')
    .bail()
    .isIn(['OPEN', 'CLOSED']).withMessage('status must be OPEN or CLOSED'),
];

module.exports = { codeParam, createRules, statusRules };
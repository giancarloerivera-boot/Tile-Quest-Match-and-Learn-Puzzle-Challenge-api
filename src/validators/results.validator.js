const { query } = require('express-validator');

const sinceRule = [
  query('since')
    .optional()
    .isISO8601().withMessage('since must be a date and time, for example 2026-11-01T00:00:00Z')
    .toDate(),
];

module.exports = { sinceRule };
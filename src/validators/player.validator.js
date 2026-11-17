const { body } = require('express-validator');
const { codeParam } = require('./session.validator');

const joinRules = [
  codeParam,
  body('nickname')                       // seat.nickname VARCHAR(100) NOT NULL
    .exists().withMessage('nickname is required')
    .bail()
    .isString().withMessage('nickname must be text')
    .bail()
    .trim()
    .isLength({ min: 2, max: 30 }).withMessage('nickname must be 2 to 30 characters long'),
];

module.exports = { joinRules };
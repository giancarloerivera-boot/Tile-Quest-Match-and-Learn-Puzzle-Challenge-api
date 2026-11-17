const { Router } = require('express');
const controller = require('../controllers/session.controller');
const playerController = require('../controllers/player.controller');
const rules = require('../validators/session.validator');
const playerRules = require('../validators/player.validator');
const validate = require('../middlewares/validate');
const requireUser = require('../middlewares/require-user');

const router = Router();

router.post('/', requireUser('HOST', 'ADMIN'), rules.createRules, validate, controller.create);
router.get('/:code', requireUser(), rules.codeParam, validate, controller.get);
router.patch('/:code', requireUser('HOST', 'ADMIN'), rules.statusRules, validate, controller.changeStatus);
router.post('/:code/players', requireUser(), playerRules.joinRules, validate, playerController.join);

module.exports = router;
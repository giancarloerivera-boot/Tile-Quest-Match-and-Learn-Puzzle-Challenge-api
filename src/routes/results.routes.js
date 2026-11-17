const { Router } = require('express');
const controller = require('../controllers/hub-results.controller');
const rules = require('../validators/results.validator');
const validate = require('../middlewares/validate');
const requireHubKey = require('../middlewares/require-hub-key');

const router = Router();

// The key is checked first, so a caller without it gets 401 whatever else it sends.
router.get('/', requireHubKey, rules.sinceRule, validate, controller.get);

module.exports = router;
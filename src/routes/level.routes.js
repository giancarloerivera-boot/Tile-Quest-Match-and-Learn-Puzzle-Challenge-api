const { Router } = require('express');
const controller = require('../controllers/level.controller');
const rules = require('../validators/level.validator');
const validate = require('../middlewares/validate');
const requireUser = require('../middlewares/require-user');

const router = Router();

router.use(requireUser('HOST', 'ADMIN')); // every endpoint in this file is for hosts

router.get('/', controller.list);
router.post('/', rules.createRules, validate, controller.create);
router.get('/:id', rules.idParam, validate, controller.get);
router.patch('/:id', rules.updateRules, validate, controller.update);
router.delete('/:id', rules.idParam, validate, controller.remove);

module.exports = router;
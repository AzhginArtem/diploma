const Router = require('express');
const ServiceController = require('../controllers/ServiceController');

const router = new Router();

router.post('/', ServiceController.getAll);
router.post('/delete', ServiceController.delete);
router.post('/new', ServiceController.create);
router.post('/edit', ServiceController.edit);

module.exports = router;

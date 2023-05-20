const Router = require('express');
const ContractsController = require('../controllers/ContractsController');

const router = new Router();

router.post('/', ContractsController.get);
router.post('/edit', ContractsController.edit);
router.post('/new', ContractsController.create);
router.post('/delete', ContractsController.delete);

module.exports = router;

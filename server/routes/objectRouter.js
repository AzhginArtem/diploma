const ObjectsController = require('../controllers/ObjectsController');
const Router = require('express');

const router = new Router();

router.post('/', ObjectsController.getAll);
router.post('/delete', ObjectsController.delete);
router.post('/new', ObjectsController.create);
router.post('/edit', ObjectsController.edit);

module.exports = router;

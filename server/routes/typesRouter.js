const Router = require('express');
const TypesController = require('../controllers/TypesController');

const router = new Router();

router.post('/delete', TypesController.delete);
router.post('/new', TypesController.create);
router.post('/edit', TypesController.edit);
router.post('/', TypesController.getAll);

module.exports = router;

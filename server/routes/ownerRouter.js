const OwnersController = require('../controllers/OwnersController');
const Router = require('express');

const router = new Router();

router.post('/delete', OwnersController.delete);
router.post('/', OwnersController.get);
router.post('/', OwnersController.get);
router.post('/', OwnersController.get);

module.exports = router;

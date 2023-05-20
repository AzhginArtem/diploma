const Router = require('express');
const UserController = require('../controllers/UserController');
const router = new Router();
const authMiddleware = require('../middleware/AuthMiddleware');

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/auth', authMiddleware, UserController.auth);
router.post('/', UserController.getAll);
router.post('/delete', UserController.delete);
router.post('/edit', UserController.edit);

module.exports = router;

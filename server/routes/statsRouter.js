const Router = require('express');
const StatsController = require('../controllers/StatsController');

const router = new Router();

router.post('/usersContract', StatsController.UsersContract);
router.post('/countOfServices', StatsController.CountOfServices);

module.exports = router;

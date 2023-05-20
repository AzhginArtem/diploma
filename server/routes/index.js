const Router = require('express');

const router = new Router();
const userRouter = require('./userRouter');
const objectRouter = require('./objectRouter');
const contractRouter = require('./contractRouter');
const serviceRouter = require('./serviceRouter');
const ownerRouter = require('./ownerRouter');
const statsRouter = require('./statsRouter');
const typeRouter = require('./typesRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/object', objectRouter);
router.use('/contract', contractRouter);
router.use('/service', serviceRouter);
router.use('/owner', ownerRouter);
router.use('/statistic', statsRouter);

module.exports = router;

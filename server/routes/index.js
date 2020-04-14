const {Router} = require('express')
const router = Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const errorHandler = require('../middleware/errorHandler')
router.use('/', userRouter);
router.use('/product', productRouter);
router.use(errorHandler)
module.exports = router
const { Router } = require('express');
const userRouter = Router();
const Controller = require('../controllers/userController');
userRouter.post('/register', Controller.register);
userRouter.post('/login', Controller.login);
module.exports = userRouter;
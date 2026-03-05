const express = require('express');

const { authController } = require('../../controller/index.js');
const authMiddleware = require('../../middleware/auth.middleware.js');

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

authRouter.get('/me', authMiddleware, authController.getMe);


module.exports = authRouter;


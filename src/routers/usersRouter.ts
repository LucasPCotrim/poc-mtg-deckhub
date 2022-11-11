import express from 'express';
import { authenticateUser } from '../middlewares/authUserMiddleware.js';
import { getUserInfo } from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/me/info', authenticateUser, getUserInfo);

export default usersRouter;

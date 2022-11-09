import express from 'express';
import { authenticateUser } from '../middlewares/authUserMiddleware.js';
import { getUserDecks } from '../controllers/decksController.js';

const decksRouter = express.Router();

decksRouter.get('/my-decks', authenticateUser, getUserDecks);

export default decksRouter;

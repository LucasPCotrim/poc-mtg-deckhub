import express from 'express';
import { authenticateUser } from '../middlewares/authUserMiddleware.js';
import validateSchema from './../middlewares/validateSchema.js';
import newDeckSchema from '../schemas/newDeckSchema.js';
import { getUserDecks, createUserDeck } from '../controllers/decksController.js';

const decksRouter = express.Router();

decksRouter.get('/my-decks', authenticateUser, getUserDecks);
decksRouter.post('/my-decks', authenticateUser, validateSchema(newDeckSchema), createUserDeck);

export default decksRouter;

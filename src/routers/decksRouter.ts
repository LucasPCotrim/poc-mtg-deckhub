import express from 'express';
import { authenticateUser } from '../middlewares/authUserMiddleware.js';
import validateSchema from './../middlewares/validateSchema.js';
import newDeckSchema from '../schemas/newDeckSchema.js';
import updateDeckSchema from '../schemas/updateDeckSchema.js';
import { getUserDecks, createUserDeck, updateUserDeck } from '../controllers/decksController.js';

const decksRouter = express.Router();

decksRouter.get('/my-decks', authenticateUser, getUserDecks);
decksRouter.post('/my-decks', authenticateUser, validateSchema(newDeckSchema), createUserDeck);
decksRouter.put(
  '/my-decks/:deckName',
  authenticateUser,
  validateSchema(updateDeckSchema),
  updateUserDeck
);

export default decksRouter;

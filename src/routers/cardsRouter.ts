import express from 'express';
import { loadCardsDatabase } from '../controllers/cardsController.js';

const cardsRouter = express.Router();

cardsRouter.post('/cards/fill-database', loadCardsDatabase);

export default cardsRouter;

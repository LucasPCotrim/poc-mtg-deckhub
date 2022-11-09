import dotenv from 'dotenv';
import { Request, Response } from 'express';
import cardsRepository from '../repositories/cardsRepository.js';
import cards from '../database/cards.js';
import { clientError } from '../errors/clientError.js';
import { serverError } from '../errors/serverError.js';
dotenv.config();

async function loadCardsDatabase(req: Request, res: Response) {
  const authorization = req.headers.authorization;
  const adminPassword = authorization?.replace('Admin ', '');

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).send(clientError(409, 'Unauthorized!'));
  }

  try {
    const cardsResult = await cardsRepository.getCards({ limit: 10, offset: 0 });
    if (cardsResult.rowCount > 0) {
      return res.status(200).send({ message: 'Card database was already loaded' });
    }

    let count = 0;
    for (const card of cards) {
      if (card.layout === 'art_series') continue;
      if (card.games.indexOf('paper') < 0) continue;
      if (!card.prices.usd) continue;
      if (card.border_color === 'silver') continue;

      const cardToAdd = {
        scryfallId: card.id,
        oracleId: card.oracle_id,
        name: card.name,
        typeLine: card.type_line,
        oracleText: card.oracle_text || '',
        manaCost: card.mana_cost || '',
        cmc: card.cmc,
        colors: card.colors ? card.colors.join('') : '',
        colorIdentity: card.color_identity ? card.color_identity.join('') : '',
        releasedAt: new Date(card.released_at),
        scryfallUri: card.scryfall_uri,
        imageUri: card.image_uris?.normal || '',
        price: Math.round(Number(100 * parseFloat(card.prices.usd))),
      };
      await cardsRepository.insertCard(cardToAdd);
      count++;
    }
    return res.status(201).send({ message: `Successfully inserted ${count} cards` });
  } catch (error) {
    console.log(error);
    return res.status(500).send(serverError(500, 'Unable to connect to database!'));
  }
}

export { loadCardsDatabase };

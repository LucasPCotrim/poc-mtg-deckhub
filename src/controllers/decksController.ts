import decksRepository from '../repositories/decksRepository.js';
import formatsRepository from '../repositories/formatsRepository.js';
import { Request, Response } from 'express';
import { clientError } from '../errors/clientError.js';
import { serverError } from '../errors/serverError.js';

async function getUserDecks(req: Request, res: Response) {
  const user = res.locals.user;

  try {
    const { rows: userDecks } = await decksRepository.getDecksByUserId(user.id);
    return res.status(200).send({ data: userDecks });
  } catch (error) {
    console.log(error);
    return res.status(500).send(serverError(500, 'Unable to connect to database!'));
  }
}

async function createUserDeck(req: Request, res: Response) {
  const user = res.locals.user;
  const { deckName, formatName } = req.body;

  try {
    const formatResult = await formatsRepository.getFormatByName(formatName);
    if (formatResult.rowCount === 0) {
      return res.status(404).send(clientError(404, 'Format not found!'));
    }
    const format = formatResult.rows[0];

    await decksRepository.insertDeck({ name: deckName, formatId: format.id, userId: user.id });
    return res.status(201).send({ message: 'Deck created successfully!' });
  } catch (error) {
    console.log(error);
    return res.status(500).send(serverError(500, 'Unable to connect to database!'));
  }
}

export { getUserDecks, createUserDeck };

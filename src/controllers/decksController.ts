import decksRepository from '../repositories/decksRepository.js';
import { Request, Response } from 'express';
import { clientError } from '../errors/clientError.js';
import { serverError } from '../errors/serverError.js';

async function getUserDecks(req: Request, res: Response) {
  const user = res.locals.user;
  console.log(user);
  try {
    const { rows: userDecks } = await decksRepository.getDecksByUserId(user.id);
    return res.status(200).send({ data: userDecks });
  } catch (error) {
    console.log(error);
    return res.status(500).send(serverError(500, 'Unable to connect to database!'));
  }
}

export { getUserDecks };

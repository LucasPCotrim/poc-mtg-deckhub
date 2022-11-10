import decksRepository from '../repositories/decksRepository.js';
import cardsRepository from '../repositories/cardsRepository.js';
import formatsRepository from '../repositories/formatsRepository.js';
import { Request, Response } from 'express';
import { clientError } from '../errors/clientError.js';
import { serverError } from '../errors/serverError.js';
const hundredCardFormats = ['commander', 'historicbrawl'];

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
  const { deckName, formatName, cards } = req.body;

  try {
    const formatResult = await formatsRepository.getFormatByName(formatName);
    if (formatResult.rowCount === 0) {
      return res.status(404).send(clientError(404, 'Format not found!'));
    }
    const format = formatResult.rows[0];

    const existingDeckResult = await decksRepository.getDeckByName(deckName);
    if (existingDeckResult.rowCount > 0) {
      return res.status(409).send(clientError(409, 'Invalid deck name!'));
    }

    const insertedDeck = await decksRepository.insertDeck({
      name: deckName,
      formatId: format.id,
      userId: user.id,
    });

    const nTotalCards = cards.reduce((acc, obj) => acc + obj.amount, 0);
    if (
      nTotalCards < 60 ||
      (hundredCardFormats.indexOf(formatName) !== -1 && nTotalCards !== 100)
    ) {
      return res.status(406).send(clientError(406, 'Invalid number of cards in deck!'));
    }

    for (const card of cards) {
      const result = await cardsRepository.getCardByName(card.cardName);
      if (result.rowCount === 0) {
        await decksRepository.deleteDeckById(insertedDeck.rows[0].id);
        return res.status(404).send(clientError(404, `Card "${card.cardName}" not found!`));
      }
      card.id = result.rows[0].id;
    }

    for (const card of cards) {
      await decksRepository.insertCardIntoDeck(card.id, insertedDeck.rows[0].id, card.amount);
    }

    return res.status(201).send({ message: 'Deck created successfully!' });
  } catch (error) {
    console.log(error);
    return res.status(500).send(serverError(500, 'Unable to connect to database!'));
  }
}

async function updateUserDeck(req: Request, res: Response) {
  const user = res.locals.user;
  const oldDeckName = req.params.deckName;
  const { deckName, formatName, cards } = req.body;

  try {
    const oldDeckResult = await decksRepository.getDeckByName(oldDeckName);
    if (oldDeckResult.rowCount === 0) {
      return res.status(404).send(clientError(404, `Deck "${oldDeckName}" not found`));
    }

    const deck = oldDeckResult.rows[0];
    if (deck.user_email !== user.email) {
      return res.status(401).send({ message: 'Unauthorized to update deck!' });
    }

    const oldFormatName = deck.format_name;
    let newFormatId = deck.format_id;
    if (formatName) {
      const existingFormat = await formatsRepository.getFormatByName(formatName);
      newFormatId = existingFormat.rows[0].id;
      if (existingFormat.rows[0] === 0)
        return res.status(404).send(clientError(404, `Format "${formatName}" not found!`));
    }

    const nTotalCards = cards.reduce((acc, obj) => acc + obj.amount, 0);
    const newFormatName = formatName || oldFormatName;
    const newDeckName = deckName || oldDeckName;

    if (
      nTotalCards < 60 ||
      (hundredCardFormats.indexOf(newFormatName) !== -1 && nTotalCards !== 100)
    ) {
      return res.status(406).send(clientError(406, 'Invalid number of cards in deck!'));
    }

    for (const card of cards) {
      const result = await cardsRepository.getCardByName(card.cardName);
      if (result.rowCount === 0) {
        return res.status(404).send(clientError(404, `Card "${card.cardName}" not found!`));
      }
      card.id = result.rows[0].id;
    }

    await decksRepository.deleteDeckById(deck.id);
    const newDeckResult = await decksRepository.insertDeck({
      name: newDeckName,
      formatId: newFormatId,
      userId: user.id,
    });
    const newDeck = newDeckResult.rows[0];

    for (const card of cards) {
      await decksRepository.insertCardIntoDeck(card.id, newDeck.id, card.amount);
    }
    return res.status(200).send({ message: `Successfully updated deck!` });
  } catch (error) {
    console.log(error);
    return res.status(500).send(serverError(500, 'Unable to connect to database!'));
  }
}

async function deleteUserDeck(req: Request, res: Response) {
  const user = res.locals.user;
  const deckName = req.params.deckName;

  try {
    const existingDeckResult = await decksRepository.getDeckByName(deckName);
    if (existingDeckResult.rowCount === 0) {
      return res.status(404).send(clientError(404, 'Deck not found!'));
    }

    const existingDeck = existingDeckResult.rows[0];
    if (existingDeck.user_email !== user.email) {
      return res.status(401).send({ message: 'Unauthorized to delete deck!' });
    }

    await decksRepository.deleteDeckById(existingDeck.id);
    return res.status(200).send({ message: 'Succesfully deleted deck!' });
  } catch (error) {
    console.log(error);
    return res.status(500).send(serverError(500, 'Unable to connect to database!'));
  }
}

export { getUserDecks, createUserDeck, updateUserDeck, deleteUserDeck };

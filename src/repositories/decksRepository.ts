import db from '../database/index.js';
import { QueryResult } from 'pg';
import { Deck } from './../protocols/deck';

async function getDecksByUserId(userId: number): Promise<QueryResult> {
  return db.query(
    `SELECT
      d.id,
      d.user_id,
      u.email AS user_email,
      d.name,
      f.name AS format_name
    FROM
      decks d
      JOIN formats f ON d.format_id = f.id
      JOIN users u ON d.user_id = u.id
    WHERE d.user_id = $1`,
    [userId]
  );
}

async function getDeckByName(deckName: string): Promise<QueryResult> {
  return db.query(
    `SELECT
      d.id,
      d.user_id,
      u.email AS user_email,
      d.name,
      f.name AS format_name
    FROM
      decks d
      JOIN formats f ON d.format_id = f.id
      JOIN users u ON d.user_id = u.id
    WHERE d.name = $1;`,
    [deckName]
  );
}

async function insertDeck(deck: Deck): Promise<QueryResult> {
  return db.query(
    `INSERT INTO decks
    ("name", "format_id", "user_id")
    VALUES
    ($1, $2, $3)
    RETURNING id;`,
    [deck.name, deck.formatId, deck.userId]
  );
}

async function insertCardIntoDeck(
  cardId: number,
  deckId: number,
  amount: number
): Promise<QueryResult> {
  return db.query(
    `INSERT INTO cards_decks
    ("card_id", "deck_id", "amount")
    VALUES
    ($1, $2, $3);`,
    [cardId, deckId, amount]
  );
}

async function deleteDeckById(deckId: number): Promise<QueryResult> {
  return db.query(
    `DELETE FROM decks
    WHERE id = $1;`,
    [deckId]
  );
}

const decksRepository = {
  getDecksByUserId,
  getDeckByName,
  insertDeck,
  insertCardIntoDeck,
  deleteDeckById,
};

export default decksRepository;

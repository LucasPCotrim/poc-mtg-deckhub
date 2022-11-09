import db from '../database/index.js';
import { QueryResult } from 'pg';
import { Deck } from './../protocols/deck';

async function getDecksByUserId(userId: number): Promise<QueryResult> {
  return db.query(
    `SELECT * FROM decks
    WHERE user_id = $1`,
    [userId]
  );
}

async function insertDeck(deck: Deck): Promise<QueryResult> {
  return db.query(
    `INSERT INTO decks
    ("name", "format_id", "user_id")
    VALUES
    ($1, $2, $3)`,
    [deck.name, deck.formatId, deck.userId]
  );
}

const decksRepository = { getDecksByUserId, insertDeck };

export default decksRepository;

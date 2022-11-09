import { QueryResult } from 'pg';
import db from '../database/index.js';

async function getDecksByUserId(userId: number): Promise<QueryResult> {
  return db.query(
    `SELECT * FROM decks
    WHERE user_id = $1`,
    [userId]
  );
}

const decksRepository = { getDecksByUserId };

export default decksRepository;

import { QueryResult } from 'pg';
import db from '../database/index.js';

async function getFormatByName(name: string): Promise<QueryResult> {
  return db.query(
    `SELECT * FROM formats
    WHERE name = $1`,
    [name]
  );
}

const formatsRepository = { getFormatByName };

export default formatsRepository;

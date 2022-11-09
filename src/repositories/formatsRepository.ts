import { QueryResult } from 'pg';
import db from '../database/index.js';

async function getFormatByName(name: string): Promise<QueryResult> {
  return db.query(
    `SELECT * FROM formats
    WHERE name = $1`,
    [name]
  );
}

async function getFormatById(id: number): Promise<QueryResult> {
  return db.query(
    `SELECT * FROM formats
    WHERE id = $1`,
    [id]
  );
}

const formatsRepository = { getFormatByName, getFormatById };

export default formatsRepository;

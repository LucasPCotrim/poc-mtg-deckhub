import db from '../database/index.js';
import { QueryResult } from 'pg';
import { Session } from '../protocols/session.js';

async function getSessionByUserId(userId: number): Promise<QueryResult> {
  return db.query(
    `SELECT * FROM sessions
    WHERE "user_id" = $1`,
    [userId]
  );
}

async function deleteSessionsByUserId(userId: number): Promise<QueryResult> {
  return db.query(
    `DELETE FROM sessions
    WHERE user_id = $1`,
    [userId]
  );
}

async function insertSession(session: Session): Promise<QueryResult> {
  return db.query(
    `INSERT INTO sessions
    (user_id, token)
    VALUES ($1, $2);`,
    [session.userId, session.token]
  );
}

const sessionsRepository = { getSessionByUserId, deleteSessionsByUserId, insertSession };

export default sessionsRepository;

import db from '../database/index.js';
import { SignUpUser } from '../protocols/signUpUser.js';

async function createUser(user: SignUpUser) {
  return db.query(
    `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)`,
    [user.name, user.email, user.hashPassword]
  );
}

async function getUserByEmail(email: string) {
  return db.query(
    `SELECT * FROM users u
    WHERE email = $1`,
    [email]
  );
}

const usersRepository = { createUser, getUserByEmail };

export default usersRepository;

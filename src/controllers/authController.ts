import { Request, Response } from 'express';
import usersRepository from '../repositories/usersRepository.js';
import sessionsRepository from '../repositories/sessionsRepository.js';
import bcrypt from 'bcrypt';

async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    // usersRepository.createUser(name, email, hashPassword, profilePic);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}

export { signUp };

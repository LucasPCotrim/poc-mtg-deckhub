import { Request, Response } from 'express';
import usersRepository from '../repositories/usersRepository.js';
import sessionsRepository from '../repositories/sessionsRepository.js';
import { clientError } from '../errors/clientError.js';
import { serverError } from '../errors/serverError.js';
import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 10;

async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
  console.log({ name, email, password });
  console.log({ hashPassword });

  try {
    const previousUser = await usersRepository.getUserByEmail(email);

    if (previousUser.rowCount > 0) {
      return res.status(500).send(clientError(409, 'Email not available!'));
    }

    await usersRepository.createUser({ name, email, hashPassword });
    res.status(201).send({ message: 'User Successfully created' });
  } catch (error) {
    console.log(error);
    return res.status(500).send(serverError(500, 'Unable to connect to database!'));
  }
}

export { signUp };

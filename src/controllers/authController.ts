import { Request, Response } from 'express';
import usersRepository from '../repositories/usersRepository.js';
import sessionsRepository from '../repositories/sessionsRepository.js';
import { clientError } from '../errors/clientError.js';
import { serverError } from '../errors/serverError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const BCRYPT_SALT_ROUNDS = 10;

async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);

  try {
    const previousUser = await usersRepository.getUserByEmail(email);

    if (previousUser.rowCount > 0) {
      return res.status(409).send(clientError(409, 'Email not available!'));
    }

    await usersRepository.createUser({ name, email, hashPassword });
    res.status(201).send({ message: 'User Successfully created' });
  } catch (error) {
    console.log(error);
    return res.status(500).send(serverError(500, 'Unable to connect to database!'));
  }
}

async function logIn(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const userResult = await usersRepository.getUserByEmail(email);
    if (userResult.rowCount === 0) {
      return res.status(401).send(clientError(401, 'Invalid email or password!'));
    }
    const user = userResult.rows[0];

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send(clientError(401, 'Invalid email or password!'));
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: '7200s' }
    );

    const sessionResult = await sessionsRepository.getSessionByUserId(user.id);
    if (sessionResult.rowCount > 0) {
      await sessionsRepository.deleteSessionsByUserId(user.id);
    }

    await sessionsRepository.insertSession({ userId: user.id, token });
    res.status(200).send({ message: 'User successfully logged in', token });
  } catch (error) {
    console.log(error);
    return res.status(500).send(serverError(500, 'Unable to connect to database!'));
  }
}

export { signUp, logIn };

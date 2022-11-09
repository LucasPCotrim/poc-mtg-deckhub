import jwt from 'jsonwebtoken';
import sessionRepository from '../repositories/sessionsRepository.js';
import { clientError } from '../errors/clientError.js';
import { serverError } from '../errors/serverError.js';

async function authenticateUser(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace('Bearer ', '');

  if (!token) return res.status(401).send(clientError(401, 'Token not found!'));

  try {
    const user = jwt.verify(token, process.env.SECRET_TOKEN);

    const sessionResult = await sessionRepository.getSessionByUserId(user.id);
    if (sessionResult.rowCount === 0) {
      return res.status(404).send(clientError(404, 'User not found!'));
    }

    res.locals.user = user;
    res.locals.token = token;
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send(clientError(401, 'Token expired!'));
    }
    return res.status(500).send(serverError(500, 'Unable to connect to database!'));
  }

  next();
}

export { authenticateUser };

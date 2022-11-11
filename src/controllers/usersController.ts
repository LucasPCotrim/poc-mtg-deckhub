import usersRepository from '../repositories/usersRepository.js';
import { Request, Response } from 'express';
import { clientError } from '../errors/clientError.js';
import { serverError } from '../errors/serverError.js';

async function getUserInfo(req: Request, res: Response) {
  const user = res.locals.user;

  try {
    const userInfoResult = await usersRepository.getUserInfoById(user.id);
    if (userInfoResult.rowCount === 0) {
      return res.status(404).send(clientError(404, 'User not found!'));
    }
    const userInfo = userInfoResult.rows[0];

    return res.status(200).send(userInfo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(serverError(500, 'Unable to connect to database!'));
  }
}

export { getUserInfo };

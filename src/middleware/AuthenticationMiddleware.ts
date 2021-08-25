import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import User from '../models/User';
import FindAuthenticatedUserService from '../services/user/FindAuthenticatedUserService';

const checkAuthentication = async (
  request: Request,
  response: Response,
  nextfunction: NextFunction,
) => {
  const { authorization } = request.headers;

  if (authorization === undefined) {
    throw new AppError('Unauthorized access', 401);
  }

  const findUserService: FindAuthenticatedUserService =
    new FindAuthenticatedUserService();

  const authenticatedUser: User = await findUserService.execute(authorization);
  if (authenticatedUser === undefined) {
    throw new AppError('Invalid Authentication', 401);
  }

  response.locals.authenticatedUser = authenticatedUser;

  nextfunction();
};

export default checkAuthentication;

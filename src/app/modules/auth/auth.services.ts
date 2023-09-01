import { User } from '@prisma/client';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginData } from './auth.interface';

const userSignUp = async (payload: User): Promise<User> => {
  const result = await prisma.user.create({
    data: payload,
  });

  return result;
};

const loginUser = async (payload: ILoginData): Promise<string> => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (isUserExist.password !== password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { role, id: userId } = isUserExist;

  const token = jwtHelpers.createToken(
    { role, userId },
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );

  return token;
};

export const AuthServices = {
  userSignUp,
  loginUser,
};

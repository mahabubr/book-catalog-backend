import { User } from '@prisma/client';

import prisma from '../../../shared/prisma';

const getUser = async (): Promise<User[]> => {
  const result = await prisma.user.findMany({});
  return result;
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

export const UserServices = {
  getUser,
  getSingleUser,
  updateUser,
};

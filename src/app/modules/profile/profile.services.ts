import { User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const getProfileData = async (
  userData: JwtPayload | null
): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: userData?.userId,
    },
  });

  return result;
};

export const ProfileServices = {
  getProfileData,
};

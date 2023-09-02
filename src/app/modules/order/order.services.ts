import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createOrder = async (data: [], userId: string): Promise<Order> => {
  const payload = { ...data, userId };

  const result = await prisma.order.create({
    data: payload,
    include: {
      user: true,
    },
  });

  return result;
};

const getAllOrders = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany();

  return result;
};

const getSpecificOrders = async (userId: string): Promise<Order[]> => {
  const result = await prisma.order.findMany({
    where: {
      userId,
    },
  });

  return result;
};

const getSingleOrder = async (
  userInfo: Record<string, unknown> | null,
  id: string
) => {
  const result = await prisma.order.findUnique({
    where: { id },
  });

  if (userInfo?.role === 'customer' && result?.userId !== userInfo?.userId) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      'Your request not acceptable'
    );
  }

  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  getSpecificOrders,
  getSingleOrder,
};

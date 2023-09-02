import { Order } from '@prisma/client';
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

export const OrderServices = {
  createOrder,
};

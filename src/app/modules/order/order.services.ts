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

export const OrderServices = {
  createOrder,
  getAllOrders,
  getSpecificOrders,
};

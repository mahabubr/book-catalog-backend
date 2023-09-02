import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderServices } from './order.services';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const userId = req.user?.userId;

  const result = await OrderServices.createOrder(data, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
};

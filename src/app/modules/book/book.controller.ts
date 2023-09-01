import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookServices } from './book.services';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await BookServices.createBook(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

export const BookController = {
  createBook,
};

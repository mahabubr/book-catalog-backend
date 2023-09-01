import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BookFilterableField, BookPaginationField } from './book.constants';
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

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterableField);
  const options = pick(req.query, BookPaginationField);

  const result = await BookServices.getAllBooks(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
};

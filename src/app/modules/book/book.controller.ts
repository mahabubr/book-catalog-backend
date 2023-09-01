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

const getBookCategories = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.categoryId;

  const options = pick(req.query, BookPaginationField);

  const result = await BookServices.getBookCategories(id, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books with associated category data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookServices.getSingleBook(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getBookCategories,
  getSingleBook,
};

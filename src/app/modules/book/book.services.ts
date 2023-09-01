import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IBookFilter } from './book.interface';

const createBook = async (payload: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data: payload,
    include: {
      category: true,
    },
  });

  return result;
};

const getAllBooks = async (
  filters: IBookFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const andConditions: [] = [];

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip: skip,
    take: size,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : { publicationDate: 'asc' },
    include: {
      category: true,
      reviewAndRatings: true,
    },
  });

  const total = await prisma.book.count();

  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};

export const BookServices = {
  createBook,
  getAllBooks,
};

import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BookSearchableField } from './book.constants';
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

  const { search, category, maxPrice, minPrice } = filters;

  const whereConditions: Prisma.BookWhereInput = {};

  if (search) {
    whereConditions.OR = BookSearchableField.map(field => ({
      [field]: {
        contains: search,
        mode: 'insensitive',
      },
    }));
  }

  if (category) {
    whereConditions.category = {
      id: category,
    };
  }

  if (maxPrice) {
    whereConditions.price = {
      lte: parseFloat(maxPrice),
    };
  }

  if (minPrice) {
    whereConditions.price = {
      gte: parseFloat(minPrice),
    };
  }

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

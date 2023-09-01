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
    },
  });

  const total = await prisma.book.count();

  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
};

const getBookCategories = async (
  id: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
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
    },
  });

  const total = await prisma.book.count({
    where: {
      categoryId: id,
    },
  });

  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });

  return result;
};

const deleteBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  return result;
};

export const BookServices = {
  createBook,
  getAllBooks,
  getBookCategories,
  getSingleBook,
  updateBook,
  deleteBook,
};

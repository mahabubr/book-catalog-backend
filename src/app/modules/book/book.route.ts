import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post(
  '/create-book',
  // auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);

router.get('/', BookController.getAllBooks);

router.get('/:categoryId/category', BookController.getBookCategories);

router.get('/:id', BookController.getSingleBook);

export const BookRoutes = router;

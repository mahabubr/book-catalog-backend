import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post(
  '/create-book',
  // auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);

export const BookRoutes = router;

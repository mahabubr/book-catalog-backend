import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post(
  '/create-category',
  // auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.createCategory
);

router.get('/', CategoryController.getAllCategory);

export const CategoryRoutes = router;

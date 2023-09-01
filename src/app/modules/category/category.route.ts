import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post(
  '/create-category',
  // auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.createCategory
);

router.get('/', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getSingleCategory);

export const CategoryRoutes = router;

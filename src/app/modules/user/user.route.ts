import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN),
  UserController.getUser
);

router.get(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser
);

router.patch(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
);

export const UserRoutes = router;

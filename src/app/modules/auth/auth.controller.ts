import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthServices } from './auth.services';

const userSignUp = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await AuthServices.userSignUp(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await AuthServices.loginUser(data);

  sendResponse<string>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User signin successfully!',
    token: result,
  });
});

export const AuthController = {
  userSignUp,
  userLogin,
};

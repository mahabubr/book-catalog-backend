import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileServices } from './profile.services';

const getProfileData = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user;

  const result = await ProfileServices.getProfileData(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

export const ProfileController = {
  getProfileData,
};

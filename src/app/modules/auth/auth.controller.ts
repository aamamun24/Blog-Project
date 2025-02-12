import { AuthServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: status.CREATED,
    data: result,
  });
});

const authLogin = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  res.cookie('token', result.token, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  });

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: status.OK,
    data: result,
  });
});

export const AuthControllers = {
  createUser,
  authLogin,
};

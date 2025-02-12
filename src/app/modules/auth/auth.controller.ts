import { AuthServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: status.CREATED,
    data: result,
  });
});

export const AuthControllers = {
  createUser,
};

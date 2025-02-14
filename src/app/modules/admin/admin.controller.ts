import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await AdminServices.blockUserIntoDB(userId);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: status.OK,
    data: result,
  });
});

export const AdminControllers = {
  blockUser,
};

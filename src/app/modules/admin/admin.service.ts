import status from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

const blockUserIntoDB = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not found');
  }

  if (user.isBlocked) {
    throw new AppError(status.FORBIDDEN, 'User is already blocked');
  }

  if (user.role === 'admin') {
    throw new AppError(
      status.FORBIDDEN,
      'Admins cannot be blocked. Only users can be blocked.',
    );
  }

  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

export const AdminServices = {
  blockUserIntoDB,
};

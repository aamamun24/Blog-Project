import status from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const createUserIntoDB = async (payload: IUser) => {
  const existingEmail = await User.findOne({ email: payload?.email });

  if (existingEmail) {
    throw new AppError(status.CONFLICT, 'Email already exits.');
  }

  const result = await User.create(payload);
  return result;
};

export const AuthServices = {
  createUserIntoDB,
};

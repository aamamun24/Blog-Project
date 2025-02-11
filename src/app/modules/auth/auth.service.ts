import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const createUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

export const AuthServices = {
  createUserIntoDB,
};

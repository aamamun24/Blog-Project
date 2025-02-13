import jwt from 'jsonwebtoken';
import status from 'http-status';
import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import config from '../../config';

const createUserIntoDB = async (payload: IUser) => {
  const existingEmail = await User.findOne({ email: payload?.email });

  if (existingEmail) {
    throw new AppError(status.CONFLICT, 'Email already exits.');
  }

  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, 'User does not exit');
  }

  const passwordMatched = bcrypt.compareSync(payload?.password, user?.password);

  if (!passwordMatched) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid password');
  }

  const blockedUser = user?.isBlocked;
  if (blockedUser) {
    throw new AppError(status.FORBIDDEN, 'User is blocked');
  }

  const jwtPayload = {
    userId: user?._id,
    email: user?.email,
    role: user?.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_token_secret as string, {
    expiresIn: '1d',
  });
  return { token };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
};

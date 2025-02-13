import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { User } from '../modules/user/user.model';

const auth = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new AppError(status.UNAUTHORIZED, 'You are not authorized!');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_token_secret as string,
  ) as JwtPayload;

  const { userId } = decoded;

  const user = await User.findById(userId).select('-password');

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found !');
  }

  if (user?.isBlocked) {
    throw new AppError(status.FORBIDDEN, 'Your account has been blocked !');
  }

  req.user = decoded;
  next();
});

export default auth;

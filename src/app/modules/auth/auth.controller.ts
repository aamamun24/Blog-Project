import { Request, Response } from 'express';
import { AuthServices } from './auth.service';

const createUser = async (req: Request, res: Response) => {
  const result = await AuthServices.createUserIntoDB(req.body);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    statusCode: 201,
    data: result,
  });
};

export const AuthControllers = {
  createUser,
};

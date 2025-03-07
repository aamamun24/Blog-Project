/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import status from 'http-status';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(status.NOT_FOUND).json({
    success: false,
    message: 'API not found',
    statusCode: status.NOT_FOUND,
    error: '',
    data: {},
  });
};

export default notFound;

import { Request, Response, NextFunction } from 'express';
import { ThrowError } from '../util/error/error';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ThrowError) {
    return res.status(err.statusCode).json({
      status: 'fail',
      message: err.message,
      data: err.data,
    });
  }

  console.error(err); 

  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
  });
};

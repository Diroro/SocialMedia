import { Response, NextFunction, Application, Request } from 'express';
import { ApiError } from '../models/errors';

export const sendApiError = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.statusCode).json({
    type: 'error', message: err.message
  });
};

export const register = (app: Application) => {
  app.use(sendApiError);
};

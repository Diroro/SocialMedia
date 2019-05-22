import { Response, NextFunction, Application, Request } from 'express';
import { ApiError } from '../models/errors';

export const sendApiError = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    type: 'error', message: err.message
  });
};

export const register = (app: Application) => {
  app.use(sendApiError);
};

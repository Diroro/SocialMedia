import { Request, Response, NextFunction } from 'express';
import UserTable from '../services/user';
import { IUser, IUserAuth } from '../models/user';
import { hash } from '../utils/accountHelper';
import { setSession } from '../utils/sessionHelper';
import Session from '../services/session';
import { ApiError } from '../models/errors';
import { sendApiError } from '../utils/errorHandler';

export const signIn = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { username, password }: IUserAuth = req.body;
    const user: IUser = await UserTable.getUserByUsername(username);
    const passwordHash = hash(password);

    if (user && user.passwordHash === passwordHash) {
      const { sessionId } = user;
      const message = await setSession({ username, res, sessionId });
      res.json(message);

    } else {
      throw new ApiError('Incorrect username/password', 409);
    }

  } catch (err) {
    next(err);
  }
};

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { username, password }: IUserAuth = req.body;
    const passwordHash = hash(password);
    const user = await UserTable.getUserByUsername(username);

    if (!user) {
      const id = await UserTable.addUser({ username, passwordHash });
      const { message } = await setSession({ username, res });
      res.json({ message, data: { username, id } });

    } else {
      throw new ApiError('This username is already existed', 409);
    }

  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionString } = req.cookies;
    const { username } = Session.parse(sessionString);
    await UserTable.updateSessionId({
      sessionId: null,
      username
    });

    res.clearCookie('sessionString');
    res.json({ message: 'Successful logout' });

  } catch (err) {
    next(err);
  }
};

export const authenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionString } = req.cookies;

    const { username, id } = Session.parse(sessionString);
    const user = await UserTable.getUserByUsername(username);
    const isAuthenticated: boolean = (user.sessionId === id);
    res.json({ authenticated: isAuthenticated });

  } catch (err) {
    next(err);
  }
};

export const authValidator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
      throw new ApiError('Not authenticated', 400);
    }

    const { username, id } = Session.parse(sessionString);
    const user = await UserTable.getUserByUsername(username);
    if (user.sessionId !== id) {
      throw new ApiError('Not authenticated', 400);
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

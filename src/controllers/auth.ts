import { Request, Response, NextFunction } from 'express';
import UserTable from '../services/user';
import { IUser, IUserAuth } from '../models/user';
import { hash } from '../utils/accountHelper';
import { setSession } from '../utils/sessionHelper';
import Session from '../services/session';
import { AuthException, BadRequestException } from '../models/errors';

export const signIn = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { username, password }: IUserAuth = req.body;

    const user = await UserTable.getUserAuthDataByUsername(username);
    const passwordHash = hash(password);

    if (user && user.passwordHash === passwordHash) {
      const { sessionId } = user;
      const { message } = await setSession({ username, res, sessionId });
      res.json({ message });

    } else {
      throw new BadRequestException('Incorrect username/password');
    }

  } catch (err) {
    next(err);
  }
};

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { username, password }: IUserAuth = req.body;
    const user = await UserTable.getUserAuthDataByUsername(username);
    if (!user) {
      const passwordHash = hash(password);
      const id = await UserTable.addUser({ username, passwordHash });
      const { message } = await setSession({ username, res });
      res.json({ message, data: { username, id } });

    } else {
      throw new BadRequestException('This username is already existed');
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
    const user = await UserTable.getUserAuthDataByUsername(username);
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
      throw new AuthException();
    }

    const { username, id } = Session.parse(sessionString);
    const user = await UserTable.getUserAuthDataByUsername(username);
    if (!user || user.sessionId !== id) {
      throw new AuthException();
    }
    return next();
    // check if we can send something through the next, e.g. user
  } catch (err) {
    return next(err);
  }
};

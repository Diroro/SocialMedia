import { Request, Response, NextFunction } from 'express';
import UserTable from '../services/user';
import { IUser } from '../models/user';

export const addUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const user: IUser = req.body;
    const id = await UserTable.addUser(user);
    return res.json(id);

  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const users = await UserTable.getUsers();
    // @TODO remove password
    return res.json(users);

  } catch (err) {
    console.log('CATCHED ERROR IN USERS');
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await UserTable.getUserById(id);
    return res.json(user);

  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await UserTable.deleteUser(id);
    return res.json({ id });

  } catch (err) {
    next(err);
  }
};

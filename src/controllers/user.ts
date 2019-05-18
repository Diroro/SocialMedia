import { Request, Response } from 'express';
import { errorHandler } from '../utils/errorHandler';
import UserTable from '../services/user';
import { IUser } from '../models/user';

export const addUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const user: IUser = req.body;
        const id = await UserTable.addUser(user);
        return res.json(id);
    } catch (err) {
        errorHandler(err, res);
    }
};

export const getUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await UserTable.getUsers();
        return res.json(users);
    } catch (err) {
        errorHandler(err, res);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await UserTable.deleteUser(id);
        return res.json({id});
    } catch (err) {
        errorHandler(err, res);
    }
};

import { Application } from 'express';
import { addUsers, getUsers, deleteUser } from '../controllers/user';

export const register = (app: Application) => {
    app.post(`/api/sign-in`, addUsers);
    app.post(`/api/sign-up`, getUsers);
};

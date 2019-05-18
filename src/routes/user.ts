import { Application } from 'express';
import { addUsers, getUsers, deleteUser } from '../controllers/user';

export const register = (app: Application) => {
    app.post(`/api/users`, addUsers);
    app.get(`/api/users`, getUsers);
    app.delete('/api/users/:id', deleteUser);
};

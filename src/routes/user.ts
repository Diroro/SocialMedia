import { Application } from 'express';
import { addUsers, getUsers, deleteUser, getUserById } from '../controllers/user';
import { authValidator } from '../controllers/auth';

export const register = (app: Application) => {
    app.post(`/api/users`, authValidator, addUsers);
    app.get(`/api/users`, authValidator, getUsers);
    app.get(`/api/users/:id`, authValidator, getUserById);
    app.delete('/api/users/:id', authValidator, deleteUser);
};

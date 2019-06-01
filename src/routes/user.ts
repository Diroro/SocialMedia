import { Application, IRouterMatcher } from 'express';
import { addUsers, getUsers, deleteUser, getUserById } from '../controllers/user';
import { authValidator } from '../controllers/auth';
import { API_CONST } from '../utils/appConsts';

export const register = (app: Application) => {
    app.post(`${API_CONST}/users`, authValidator, addUsers);
    app.get(`${API_CONST}/users`, authValidator, getUsers);
    app.get(`${API_CONST}/users/:id`, authValidator, getUserById);
    app.delete(`${API_CONST}/users/:id`, authValidator, deleteUser);
};

// const authValidatorDecorator = (func: IRouterMatcher<any>) => {
//   const { path, ...handlers } = func;
//   func(path, handler, ...handlers);
// }

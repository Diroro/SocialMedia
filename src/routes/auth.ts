import { Application } from 'express';
import { signUp, signIn, logout, authenticated, authValidator } from '../controllers/auth';
import { API_CONST } from '../utils/appConsts';

export const register = (app: Application) => {
  app.post(`${API_CONST}/sign-in`, signIn);
  app.post(`${API_CONST}/sign-up`, signUp);
  app.get(`${API_CONST}/logout`, authValidator, logout);
  app.get(`${API_CONST}/authenticated`, authValidator, authenticated);

  console.log('AUTH ROUTES REGISTERED');
};

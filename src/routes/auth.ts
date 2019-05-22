import { Application } from 'express';
import { signUp, signIn, logout, authenticated, authValidator } from '../controllers/auth';

export const register = (app: Application) => {
  app.post(`/api/sign-in`, signIn);
  app.post(`/api/sign-up`, signUp);
  app.get(`/api/logout`, authValidator, logout);
  app.get(`/api/authenticated`, authValidator, authenticated);

  console.log('AUTH ROUTES REGISTERED');
};

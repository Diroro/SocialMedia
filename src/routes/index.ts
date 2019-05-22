import { Application, Response, Request } from 'express';
import { register as userRouteRegister } from './user';
import { register as authRouteRegister } from './auth';

export const register = (app: Application) => {
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello world!');
    });

    userRouteRegister(app);
    authRouteRegister(app);
};

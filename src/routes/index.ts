import { Application, Response, Request } from 'express';
import { register as userRouteRegister } from './user';
import { register as authRouteRegister } from './auth';
import { register as mediaRecordRouteRegister } from './mediaRecord';

export const register = (app: Application) => {
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello world!');
    });

    userRouteRegister(app);
    authRouteRegister(app);
    mediaRecordRouteRegister(app);
};

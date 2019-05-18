import { Application, Response, Request } from 'express';
import { register as userRouteRegister } from './user';

export const register = (app: Application) => {
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello world!');
    });

    userRouteRegister(app);

};

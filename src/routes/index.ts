import { Application, Response, Request } from 'express';

export const register = (app: Application) => {
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello world!');
    });
};

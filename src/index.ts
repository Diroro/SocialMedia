import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { register as registerRoutes } from './routes';

dotenv.config();

const port = process.env.SERVER_PORT;

const app = express();

// configure routes
registerRoutes(app);

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});

import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { register as registerRoutes } from './routes';
import { register as registerErrorHandler } from './utils/errorHandler';

dotenv.config();

const port = process.env.SERVER_PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));
// @TODO change for dev/prod stand
// the server handles requests only from this origin
app.use(cookieParser());

// configure routes
registerRoutes(app);
registerErrorHandler(app);

// @TODO logger
// @TODO Format Responses: create classes

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

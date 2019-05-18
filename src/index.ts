import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import express from 'express';
import { register as registerRoutes } from './routes';

dotenv.config();

const port = process.env.SERVER_PORT;

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({ origin: 'http://localhost:3000' }));
// configure routes
registerRoutes(app);

// @TODO logger
// @TODO error handler
//
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

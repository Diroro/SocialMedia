import { Response } from 'express';

export const errorHandler = (err: Error, res: Response) => {
    console.error(err);
    res.json({ error: err.message || err });
};

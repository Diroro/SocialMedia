import { Request, Response, NextFunction } from 'express';
import MediaRecordTable from '../services/MediaRecord';
import { IMediaRecord } from '../models/mediaRecord';
import Session from '../services/session';
import { checkUsernameAuthor } from '../utils/referenceHelper';

export const addMediaRecord = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { sessionString } = req.cookies;
    const { username: authorUsername } = Session.parse(sessionString);
    const { description, url } = req.body;

    const mediaRecord = {
      description,
      url,
      dateCreated: new Date(),
      authorUsername
    };

    const id = await MediaRecordTable.addMediaRecord(mediaRecord);
    // @TODO not just id, all mediaRecord
    return res.json(id);

  } catch (err) {
    next(err);
  }
};

export const getMediaRecords = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // check the params
    // if no: my or all?
    // if yes: ?username=...
    const { sessionString } = req.cookies;
    const { username: authorName } = req.query;

    const { username } = Session.parse(sessionString);

    const MediaRecords = await MediaRecordTable.getMediaRecords(authorName || username);
    // @TODO remove password
    return res.json(MediaRecords);

  } catch (err) {
    next(err);
  }
};

export const getMediaRecordById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    const MediaRecord = await MediaRecordTable.getMediaRecordById(id);
    return res.json(MediaRecord);

  } catch (err) {
    next(err);
  }
};

export const deleteMediaRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { sessionString } = req.cookies;
    await checkUsernameAuthor(sessionString, id);

    await MediaRecordTable.deleteMediaRecord(id);
    return res.json({ id });

  } catch (err) {
    next(err);
  }
};

export const editMediaRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params;

    const { sessionString } = req.cookies;
    await checkUsernameAuthor(sessionString, id);

    const { description, url }: IMediaRecord = req.body;

    const mediaRecord = {
      id: +id,
      description,
      url,
      dateModified: new Date(),
    };

    const updatedRecord = await MediaRecordTable.updateMediaRecord(mediaRecord);
    return res.json(updatedRecord);

  } catch (err) {
    next(err);
  }
};

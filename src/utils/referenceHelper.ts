import { ForbiddenException } from '../models/errors';
import MediaRecordTable from '../services/MediaRecord';
import Session from '../services/session';

export const checkUsernameAuthor = async (sessionString: string, id: string) => {
  const { username } = Session.parse(sessionString);
  const existedMediaRecord = await MediaRecordTable.getMediaRecordById(id);
  if (existedMediaRecord.authorUsername !== username) {
    throw new ForbiddenException(`Your're not an author of this media record`);
  }
};

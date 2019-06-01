import { dbPool } from './databasePool';
import { IMediaRecord } from '../models/mediaRecord';
import { ApiError, ForbiddenException } from '../models/errors';
import { Request } from 'express';
import Session from './session';

class MediaRecordTable {
  public static async addMediaRecord(mediaRecord: IMediaRecord): Promise<number> {
    try {
      // const {
      //   description,
      //   url,
      //   dateCreated,
      //   username,
      // } = mediaRecord;
      const data = await dbPool.query(`
        INSERT INTO media_records(description, url, "dateCreated", "authorUsername")
            VALUES( $[description], $[url], $[dateCreated], $[authorUsername] )
            RETURNING id, description, url, "dateCreated", "authorUsername", "dateMofidied";
        `,
        {
          ...mediaRecord
        });

      return data[0];
    } catch (err) {
      // throw new DB ERROR
      throw new ApiError('Something went wrong');
    }
  }

  public static async getMediaRecordById(id: string): Promise<IMediaRecord> {
    try {
      const mediaRecords = await dbPool.query(`
        SELECT
          id,
          TRIM(description) as description,
          TRIM(url) as url,
          "dateCreated",
          "dateModified",
          TRIM("authorUsername") as "authorUsername"
        FROM media_records
        WHERE id  = $1
      `,
        id
      );
      return mediaRecords[0];
    } catch (err) {
      throw new ApiError('Something went wrong');
    }
  }

  public static async getMediaRecords(username: string): Promise<IMediaRecord[]> {
    try {
      let query: string = `
      SELECT
        id,
        TRIM(description) as description,
        TRIM(url) as url,
        "dateCreated",
        "dateModified",
        TRIM("authorUsername") as "authorUsername"
      FROM media_records
      `;
      if (username) {
        query += ' WHERE "authorUsername" = $1';
      }
      const mediaRecords = await dbPool.query(query, username);
      return mediaRecords;
    } catch (err) {
      throw new ApiError('Something went wrong');
    }
  }

  public static async deleteMediaRecord(id: number): Promise<number> {
    try {
      await dbPool.result(`
      DELETE
      FROM media_records
      WHERE id = $[id]`,
        { id }
      );
      return id;
    } catch (err) {
      throw new ApiError('Something went wrong');
    }
  }

  public static async updateMediaRecord(data: IMediaRecord) {
    try {
      await dbPool.query(`
        UPDATE mediaRecords
        SET description = $[description], url = $[url], "dateModified" = $[dateModified]
        WHERE id = $[id]`, { ...data });
      return data;
    } catch (err) {
      throw new ApiError('Something went wrong');
    }
  }

}

export default MediaRecordTable;

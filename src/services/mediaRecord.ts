import { dbPool } from './databasePool';
import { IMediaRecord } from '../models/mediaRecord';
import { ApiError, ForbiddenException } from '../models/errors';
// import { Request } from 'express';
// import Session from './session';
import { DEFAULT_LIMIT } from '../utils/appConsts';
import { IPaginationResponse } from '../models/response';

interface IQueryParams {
  where: string;
  orderBy: string;
  limit: number;
  offset: number;
}

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
        WHERE id = $1
      `,
        id
      );
      return mediaRecords[0];
    } catch (err) {
      throw new ApiError('Something went wrong');
    }
  }

  public static async getMediaRecords(
    username: string, limit: string, offset: string
    ): Promise<IPaginationResponse<IMediaRecord>> {

    try {
      const queryParams: IQueryParams = {
        where: null,
        orderBy: 'id',
        limit: +limit || DEFAULT_LIMIT,
        offset: +offset || 0,
      };

      if (username) {
        queryParams.where = `WHERE "authorUsername" = $[username]`;
        Object.assign(queryParams, { username });
      }

      const query = `
        SELECT
          id,
          TRIM(description) as description,
          TRIM(url) as url,
          "dateCreated",
          "dateModified",
          TRIM("authorUsername") as "authorUsername"
        FROM media_records
        ${queryParams.where || ''}
        ORDER BY $[orderBy~]
        LIMIT $[limit]
        OFFSET $[offset];
      `;

      const mediaRecords = await dbPool.query(
        query,
        queryParams
      );

      const count = await dbPool.query(`
        SELECT count(*) FROM media_records
        ${queryParams.where || ''};`,
        queryParams
      );

      return {
        items: mediaRecords,
        count: +count[0].count,
        limit: queryParams.limit,
        offset: queryParams.offset
      };
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

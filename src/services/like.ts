import { dbPool } from './databasePool';
import { IUser } from '../models/user';
import { ApiError } from '../models/errors';
import { ILike } from '../models/like';

class LikeTable {
  public static async like(likeData: ILike): Promise<ILike> {
    try {
      const data = await dbPool.query(`
        INSERT INTO likes("authorUsername", "recordId")
            VALUES( $[authorUsername], $[recordId])
        `,
        { ...likeData });
      console.log(data);
      return likeData;
    } catch (err) {
      // throw new DB ERROR
      throw new ApiError('Something went wrong');
    }
  }

  public static async unlike(like: ILike): Promise<number> {
    try {
      await dbPool.result(`
      DELETE
      FROM likes
      WHERE "authorUsername" = $[authorUsername] AND "recordId" = $[recordId]`,
        { ...like }
      );
      return like.recordId;

    } catch (err) {
      throw new ApiError('Something went wrong');
    }
  }

  public static async getRecordLikes(recordId: number): Promise<ILike[]> {
    try {
      const likes = await dbPool.query(`
        SELECT
          "authorUsername"
          "recordId"
        FROM likes
        WHERE "recordId" = $[recordId]
      `,
        { recordId }
      );
      console.log('GET RECORD LIKES: ', recordId, likes);
      return likes;
    } catch (err) {
      throw new ApiError('Something went wrong');
    }
  }

}

export default LikeTable;

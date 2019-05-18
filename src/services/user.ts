import { dbPool } from './databasePool';
import { IUser } from '../models/user';

class UserTable {
  public static async addUser(user: IUser): Promise<number> {
    try {
      const id = await dbPool.query(
        `INSERT INTO users(nickname, name, posts_count)
                 VALUES( $[nickname], $[name], 0)
                 RETURNING id;`,
        { ...user });
      return id;
    } catch (err) {
      console.error(err);
      // throw new DB ERROR
    }
  }

  public static async getUsers(): Promise<IUser[]> {
    try {
      console.log('GETTING FROM DB: USERS');
      const users = await dbPool.query(`
        SELECT
            id,
            nickname,
            name,
            description,
            posts_count
        FROM users
      `);
      return users;
    } catch (err) {
      console.error(err);
      // throw new DB ERROR
    }
  }

  public static async deleteUser(id: number): Promise<number> {
    try {
      await dbPool.result(`
      DELETE
      FROM users
      WHERE id = $[id]`,
        { id }
      );
      return id;
    } catch (err) {
      console.error(err);
      // throw new DB ERROR
    }
  }
}

export default UserTable;

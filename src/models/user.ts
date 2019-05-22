export interface IUser {
  id?: number;
  username: string;
  name?: string;
  description?: string;
  postsCount?: number;
  passwordHash: string; // @TODO сделать ли его обязательным
  sessionId?: string;
}

// export class DBUser {

// }

// export class User {

// }

export interface IUserAuth {
  username: string;
  password: string;
}

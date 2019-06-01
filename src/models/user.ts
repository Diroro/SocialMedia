export interface IUser {
  id?: number;
  username: string;
  name?: string;
  description?: string;
  passwordHash: string; // @TODO сделать ли его обязательным
  sessionId?: string;
}

// @TODO may be validations in class

// export class DBUser {

// }

// export class User {

// }

export interface IUserAuth {
  username: string;
  password: string;
}

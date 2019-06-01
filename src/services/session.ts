import uuid from 'uuid/v4';
import { hash } from '../utils/accountHelper';

interface IAccountData {
  username: string;
  id: string;
}

const SEPARATOR = '|';

class Session {
  public static accountData(account: IAccountData): string {
    const { username, id } = account;
    return `${username}${SEPARATOR}${id}`;
  }

  public static parse(sessionString: string) {
    const [username, id, sessionHash] = sessionString.split(SEPARATOR);
    return {
      username,
      id,
      sessionHash,
    };
  }

  public static verify(sessionString: string): boolean {
    const { username, id, sessionHash } = Session.parse(sessionString);

    const accountData = Session.accountData({ username, id });
    return hash(accountData) === sessionHash;
  }

  public static sessionString(accountData: IAccountData): string {
    const { username, id } = accountData;
    const accDataString = Session.accountData({ username, id });
    return `${accDataString}${SEPARATOR}${hash(accDataString)}`;
  }

  public id: string;
  private username: string;

  constructor({ username }: { username: string }) {
    this.username = username;
    this.id = uuid();
  }

  public toString() {
    const { username, id } = this;
    return Session.sessionString({ username, id });
  }
}

export default Session;

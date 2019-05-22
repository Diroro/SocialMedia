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
    const sessionData = sessionString.split(SEPARATOR);
    return {
      username: sessionData[0],
      id: sessionData[1],
      sessionHash: sessionData[2],
    };
  }

  public static verify(sessionString: string): boolean {
    const { username, id, sessionHash } = Session.parse(sessionString);

    const accountData = Session.accountData({ username, id });
    return hash(accountData) === sessionHash;
  }

  public static sessionString(accountData: IAccountData): string {
    const { username, id } = accountData;
    const accData = Session.accountData({ username, id });
    return `${accData}${SEPARATOR}${hash(accData)}`;
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

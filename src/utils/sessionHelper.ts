import Session from '../services/session';
import { Response } from 'express';
import UserTable from '../services/user';

const setSessionCookie = ({ sessionString, res }: { sessionString: string, res: Response }) => {
  res.cookie('sessionString', sessionString, {
    expires: new Date(Date.now() + 3600000),
    httpOnly: true,
    // secure: true, // used with https
  });
};

export const setSession = async ({ username, res, sessionId }: { username: string, res: Response, sessionId?: string }) => {
  let session;
  let sessionString;

  if (sessionId) {
    sessionString = Session.sessionString({ username, id: sessionId });
    setSessionCookie({ sessionString, res });
    return { message: 'SESSION RESTORED' }; // new response

  } else {
    session = new Session({ username });
    sessionString = session.toString();

    await UserTable.updateSessionId({
      sessionId: session.id,
      username,
    });

    setSessionCookie({ sessionString, res });
    return { message: 'SESSION CREATED' }; // new response
  }

};

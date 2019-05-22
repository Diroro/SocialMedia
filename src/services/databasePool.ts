import pgPromise from 'pg-promise';

import databaseConfiguration from '../secrets/databaseConfiguration';

const pgp = pgPromise();
export const dbPool = pgp(databaseConfiguration);

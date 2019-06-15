CREATE TABLE users(
    id      SERIAL UNIQUE,
    username VARCHAR(64) NOT NULL PRIMARY KEY,
    "passwordHash" VARCHAR(64) NOT NULL,
    name VARCHAR(64),
    description VARCHAR(255),
    "sessionId" VARCHAR(36)
);

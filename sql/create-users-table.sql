CREATE TABLE users(
    id      SERIAL PRIMARY KEY,
    username CHARACTER(64) NOT NULL UNIQUE,
    "passwordHash" CHARACTER(64) NOT NULL,
    name CHARACTER(64),
    description CHARACTER(255),
    "sessionId" CHARACTER(36)
);

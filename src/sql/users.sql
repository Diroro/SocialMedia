CREATE TABLE users(
    id      SERIAL PRIMARY KEY,
    username CHARACTER(64) NOT NULL,
    "passwordHash" CHARACTER(64) NOT NULL,
    name CHARACTER(64),
    description CHARACTER(255),
    posts_count INTEGER,
    "sessionId" CHARACTER(36)
);

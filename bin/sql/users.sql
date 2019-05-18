CREATE TABLE users(
    id      SERIAL PRIMARY KEY,
    username CHARACTER(64),
    "passwordHash" CHARACTER(64),
    name CHARACTER(64),
    description CHARACTER(255),
    post_count INTEGER
);

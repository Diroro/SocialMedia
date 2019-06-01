CREATE TABLE likes (
    id      SERIAL PRIMARY KEY,
    "authorUsername"  CHARACTER(64) REFERENCES users(username),
    "recordId"  INTEGER REFERENCES media_records(id)
);

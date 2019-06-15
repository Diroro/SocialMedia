CREATE TABLE likes (
    "authorUsername"  CHARACTER(64) REFERENCES users(username),
    "recordId"  INTEGER REFERENCES media_records(id),
    PRIMARY KEY ("authorUsername", "recordId")
);

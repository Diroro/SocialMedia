CREATE TABLE media_records (
    id            SERIAL PRIMARY KEY,
    description   CHARACTER(255),
    url           CHARACTER(255) NOT NULL,
    "dateCreated" TIMESTAMP,
    "dateModified" TIMESTAMP,
    "authorUsername"  CHARACTER(64),
    FOREIGN KEY ("authorUsername") REFERENCES users (username)
);

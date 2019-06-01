#!/bin/bash

export PGPASSWORD = 'postgres'

echo "Configuring social_media_db"

dropdb -U postgres social_media_db
createdb -U postgres social_media_db

psql -U postgres social_media_db < ./src/sql/create-users-table.sql
psql -U postgres social_media_db < ./src/sql/create-users.sql
psql -U postgres social_media_db < ./src/sql/create-media-records-table.sql
psql -U postgres social_media_db < ./src/sql/create-likes-table.sql

psql -U postgres social_media_db < ./src/sql/create-users.sql
psql -U postgres social_media_db < ./src/sql/create-media-records.sql


echo "social_media_db is configured!"

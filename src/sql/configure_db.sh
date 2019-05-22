#!/bin/bash

export PGPASSWORD = 'postgres'

echo "Configuring social_media_db"

dropdb -U postgres social_media_db
createdb -U postgres social_media_db

psql -U postgres social_media_db < ./src/sql/users.sql

echo "social_media_db is configured!"

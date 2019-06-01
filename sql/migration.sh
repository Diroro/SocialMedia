#migration

export PGPASSWORD = 'postgres'
echo "MIGRATION STARTED"


psql -U postgres postgres social_media_db < ./src/sql/create-media-records.sql
psql -U postgres postgres social_media_db < ./src/sql/create-likes.sql

echo "MIGRATION COMPLETED!"

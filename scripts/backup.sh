#!/bin/bash

#load variables
export $(grep -v '^#' .env | xargs)

docker exec postgres /bin/sh -c "pg_dump -p $DATABASE_PORT -U $DATABASE_USERNAME -d $DATABASE_DATABASE > /usr/src/backups/backup-$(date +"%Y-%m-%d-%T").sql"

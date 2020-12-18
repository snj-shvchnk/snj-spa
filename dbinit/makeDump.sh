#!/bin/bash

# Snj: backup mysql database 'dev_database_1'
#      by SSH connection - easy use command:
#           mysqldump -h "$_host" -u"$_user" -p"$_pass" "$_dbname" > "$_file"

_host="127.0.0.1"
_user="root"
_pass="1111"
_dbname="dev_database_1"

_now=$(date +"%Y_%m_%d_%H_%M_%S")
_file="./dumps/db-$_dbname-backup-$_now.sql"

echo "Starting backup to $_file..."
mysqldump -h "$_host" -u"$_user" -p"$_pass" "$_dbname" > "$_file"
echo "DONE dump $_dbname to $_file."

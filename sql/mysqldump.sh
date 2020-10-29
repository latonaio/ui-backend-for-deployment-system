#!/bin/bash
SCRIPT_DIR=$(cd $(dirname $0); pwd)
mysqldump -u latona -pLatona2019! Deployment -r $SCRIPT_DIR/Deployment_dump.sql
mysqldump -u latona -pLatona2019! Project -r $SCRIPT_DIR/Project_dump.sql

mysqldump -d -u latona -pLatona2019! Device -r $SCRIPT_DIR/Device_dump.sql
mysqldump -d -u latona -pLatona2019! Pod -r $SCRIPT_DIR/Pod_dump.sql

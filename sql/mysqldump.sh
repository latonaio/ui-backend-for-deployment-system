#!/bin/bash
SCRIPT_DIR=$(cd $(dirname $0); pwd)
mysqldump -u latona -platonalatona Deployment -r $SCRIPT_DIR/Deployment_dump.sql
mysqldump -u latona -platonalatona Project -r $SCRIPT_DIR/Project_dump.sql

mysqldump -d -u latona -platonalatona Device -r $SCRIPT_DIR/Device_dump.sql
mysqldump -d -u latona -platonalatona Pod -r $SCRIPT_DIR/Pod_dump.sql

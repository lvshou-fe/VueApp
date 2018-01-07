#!/bin/bash

SCRIPT_PATH="`dirname \"$0\"`"
cd ${SCRIPT_PATH}

sh start_db.sh
sh wait_for_mongo.sh
sh start_app.sh
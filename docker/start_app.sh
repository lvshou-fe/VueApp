#!/bin/bash

SCRIPT_PATH="`dirname \"$0\"`"
cd ${SCRIPT_PATH}

docker-compose up -d app

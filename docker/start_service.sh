#!/bin/bash

# Allow running the script from parent folders by getting the path and cd'ing to the folder
SCRIPT_PATH="`dirname \"$0\"`"
cd ${SCRIPT_PATH}

echo 'Starting services..'

docker-compose up

echo 'Services are running..'
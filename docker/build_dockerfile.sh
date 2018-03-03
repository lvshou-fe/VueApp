#!/bin/bash

# Allow running the script from parent folders by getting the path and cd'ing to the folder
SCRIPT_PATH="`dirname \"$0\"`"
cd ${SCRIPT_PATH}

TAG=$1

echo 'Building a dockerfile..'

docker build -t "$1" -f Dockerfile ../

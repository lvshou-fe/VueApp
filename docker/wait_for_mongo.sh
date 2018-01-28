#!/bin/bash

# Get the active docker process id
DOCKER_ID=$(docker-compose ps -q mongodb)

# Exec into the running container and wait until mongodb is responding
until docker exec -i -t "${DOCKER_ID}" mongo --quiet --eval 'quit(db.runCommand({ ping: 1 }).ok ? 0 : 2)'; do
  echo 'waiting for db..'
  sleep 1
done

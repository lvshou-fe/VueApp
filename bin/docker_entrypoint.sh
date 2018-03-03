#!/bin/bash

# Wait for db to be up and run the server
bash ../bin/wait-for-it.sh $1 -- npm run server:prod

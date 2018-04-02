#!/bin/bash

# Allow running the script from parent folders by getting the path and cd'ing to the folder
echo 'Building project..'
cd app
rm -rf node_modules
npm install --quiet --no-progress
cd ..
cd app/frontend
rm -rf node_modules
npm install --quiet --no-progress
npm run build:all

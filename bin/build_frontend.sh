#!/bin/bash

echo 'Building frontend..'
cd frontend
rm -rf node_modules
npm install --quiet --no-progress
npm run build

# VueApp hobby project

[![Build Status](https://circleci.com/gh/ottoo/VueApp/tree/master.svg?style=shield&circle-token=7452b036509c90784a124fcb9e1c8742bc063400)](https://circleci.com/gh/ottoo/VueApp)

This is an application skeleton built with Vue and HapiJS and Mongodb. Backend has a
simple CRUD api for users operations. It also can serve the frontend and its
assets accordingly.

### Features

- Registration
  * Users can register new accounts
- Login
  * Users can login to the application via JWT based authentication

### TODO

- Improve user registration
- Improve environment setup
- Add content inside the authenticated application

### How to run

Add `.env` file to the `/docker` folder. You can edit the `.example.env` file and then change its
filename to `.env`.

Example

```
DB_HOST=mongodb               // Host name linked in docker-compose file, should be mongodb
DB_PORT=27017
JWT_SECRET=SomeSecret
TOKEN_EXPIRY=86400
MONGODB_DATABASE=own          // Database to create on initial run
MONGODB_ROOT_PASSWORD=rootpw  // Creates a root user with the given pw
MONGODB_USERNAME=username     // Username to login with restricted rights
MONGODB_PASSWORD=password
```

Then run `/docker/start_service.sh` to start the service. It runs mongodb first and then
waits for it to be ready before running the application server itself.

Stop service `/docker/stop_service.sh`
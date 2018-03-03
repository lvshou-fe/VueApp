FROM node:8.9.0 as frontend

# Stage 0, build the frontend
COPY . /app
WORKDIR /app
RUN chmod +x bin/build_frontend.sh
RUN bin/build_frontend.sh

# Stage 1, build the server
FROM node:8.9.0 as backend

# Install server dependencies
COPY /backend/package.json /tmp/package.json
RUN cd /tmp && npm install

# Create backend directory
RUN mkdir -p /app/backend && cp -a /tmp/node_modules /app/backend

# Bundle server source
WORKDIR /app
COPY ./backend /app/backend

# Add script for starting the app
COPY ./bin /app/bin
RUN chmod +x /app/bin/wait-for-it.sh /app/bin/docker_entrypoint.sh

# Bundle fromtend from stage 0
COPY --from=frontend /app/frontend/dist /app/frontend/dist

# Run application
EXPOSE 3334
WORKDIR /app/backend

CMD [ "npm", "run", "server:prod" ]

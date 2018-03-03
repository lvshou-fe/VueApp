const Hapi = require('hapi');
const HapiJwt2 = require('hapi-auth-jwt2');
const Inert = require('inert');
const Good = require('good');

require('dotenv').config();
require('./config/database');

// Create server instance
const server = new Hapi.Server();
server.connection({
  port: 3334,
  routes: {
    cors: true,
    files: {
      relativeTo: __dirname
    }
  },
  router: {
    stripTrailingSlash: true
  }
});

// Register plugins, routes and start the server
server.register([{
  register: Inert,
  options: {}
}, {
  register: HapiJwt2,
  options: {}
}, {
  register: require('./plugins/auth.strategy.plugin')
}, {
  register: require('./plugins/prefix.plugin'),
  routes: {
    prefix: '/api'
  }
}, {
  register: require('./plugins/frontend.static.route.plugin')
}, {
  register: require('./plugins/socket.io.plugin')
}, {
  register: require('hapi-cors'),
  options: {
    origins: ['*']
  }
}, {
  register: Good,
  options: {
    ops: {
      interval: 1000
    },
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          log: '*',
          response: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
}], (err) => {
  if (err) {
    throw err;
  }

  server.start(() => {
    server.log('info', `Server running at: ${server.info.uri}`);
  });
});

module.exports = server;

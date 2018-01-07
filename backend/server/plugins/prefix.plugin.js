const userRoutes = require('./../routes/user');
const testRoutes = require('./../routes/test');

exports.register = (server, options, next) => {
  server.route([
    ...userRoutes,
    ...testRoutes
  ]);
  next();
};

exports.register.attributes = {
  name: 'api',
  version: '1.0.0'
};

const _ = require('lodash');

exports.register = (server, options, next) => {
  const io = require('socket.io')(server.listener);

  io.on('connection', (socket) => {
    console.log('New connection!', socket.id);
  });

  next();
};

exports.register.attributes = {
  name: 'socket.io',
  version: '1.0.0'
};

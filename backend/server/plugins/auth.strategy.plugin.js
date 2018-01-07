const Moment = require('moment');

exports.register = (server, options, next) => {
  const validate = (decoded, request, callback) => { // eslint-disable-line
    const diff = Moment().diff(Moment(decoded.iat * 1000));

    if (diff > process.env.TOKEN_EXPIRY * 1000) {
      return callback(null, false);
    }

    callback(null, true);
  };

  server.auth.strategy('jwt', 'jwt', 'required', {
    key: process.env.JWT_SECRET,
    validateFunc: validate,
    verifyOptions: {
      algorithms: ['HS256']
    }
  });

  next();
};

exports.register.attributes = {
  name: 'auth-strategy',
  version: '1.0.0'
};
const JWT = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
const tokenExpiry = process.env.TOKEN_EXPIRY;

class Utils {
  // eslint-disable-next-line
  generateJWT(user) {
    const jwtData = {
      name: user.name,
      email: user.email,
      _id: user._id.toString()
    };

    const jwt = JWT.sign(jwtData, jwtSecret, {
      expiresIn: Number(tokenExpiry)
    });

    return jwt;
  }

  generateMockJWT() {
    return this.generateJWT({
      name: 'Test User',
      email: 'testuser@test.com',
      _id: '587bb173dbdb9a2894c099cb'
    });
  }

  verifyEnvVars({ TOKEN_EXPIRY, JWT_SECRET }) {
    if (typeof TOKEN_EXPIRY === 'undefined') {
      throw new Error('Error. Jwt token expiry must be set.');
    }

    if (typeof JWT_SECRET === 'undefined') {
      throw new Error('Error. Jwt secret must be set.');
    }
  }
}

module.exports = new Utils();

import { testAction } from '../../helpers';

// eslint-disable-next-line
const actionsInjector = require('inject-loader!./../../../../src/vuex/actions/auth');

describe('auth actions', () => {
  it('login success', (done) => {
    const actions = actionsInjector({
      '../../api/auth': {
        login() {
          return Promise.resolve({
            data: {
              username: 'testuser',
              userId: '123',
              token: 'testtoken'
            }
          });
        }
      }
    });

    const payload = {
      username: 'testuser',
      password: 'password'
    };

    testAction(actions.default.LOGIN, payload, { user: payload }, [
      { type: 'LOGIN' },
      {
        type: 'LOGIN_SUCCESS',
        payload: {
          username: 'testuser',
          userId: '123',
          token: 'testtoken'
        }
      }
    ], done);
  });

  it('login failure', (done) => {
    const actions = actionsInjector({
      '../../api/auth': {
        login() {
          return Promise.reject();
        }
      }
    });

    const payload = {
      username: 'testuser',
      password: 'password'
    };

    testAction(actions.default.LOGIN, payload, { user: payload }, [
      { type: 'LOGIN' },
      { type: 'LOGIN_FAILURE' }
    ], done);
  });
});

import { testAction } from '../../helpers';

import loginActions from '../../../../src/vuex/actions/login';

jest.mock('../../../../src/api/login.js');
// eslint-disable-next-line
import Api from '../../../../src/api/login';

describe('auth actions', () => {
  it('login success', (done) => {
    Api.login.mockImplementationOnce(() => new Promise((resolve) => {
      resolve({
        data: {
          username: 'testuser',
          userId: '123',
          token: 'testtoken'
        }
      });
    }));
    expect.assertions(3);

    const payload = {
      username: 'testuser',
      password: 'password'
    };

    testAction(loginActions.LOGIN, payload, { user: payload }, [
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
    Api.login.mockImplementationOnce(() => new Promise((resolve, reject) => {
      reject();
    }));

    expect.assertions(2);

    const payload = {
      username: 'testuser',
      password: 'password'
    };

    testAction(loginActions.LOGIN, payload, { user: payload }, [
      { type: 'LOGIN' },
      { type: 'LOGIN_FAILURE' }
    ], done);
  });
});

import mutations from './../../../../src/vuex/mutations';

describe('auth mutations', () => {
  it('LOGIN', () => {
    const state = {
      user: {
        isLoading: false,
        data: {}
      }
    };

    mutations.LOGIN(state);

    expect(state).to.deep.equal({
      user: {
        isLoading: true,
        data: {}
      }
    });
  });

  it('LOGIN_SUCCESS', () => {
    const state = {
      user: {
        isAuthenticated: false,
        isLoading: false,
        data: {}
      }
    };

    mutations.LOGIN_SUCCESS(state, {
      username: 'testuser',
      password: 'testpassword'
    });

    expect(state).to.deep.equal({
      user: {
        isAuthenticated: true,
        isLoading: false,
        data: {
          username: 'testuser',
          password: 'testpassword'
        }
      }
    });
  });

  it('LOGIN_FAILURE', () => {
    const state = {
      user: {
        isLoading: false,
        data: {}
      }
    };

    mutations.LOGIN_FAILURE(state);

    expect(state).to.deep.equal({
      user: {
        isLoading: false,
        data: {}
      }
    });
  });
});

import Api from '../../api/login';
import tokenService from '../../config/tokenService';

export default {
  LOGIN({ commit }, userData) {
    commit('LOGIN');

    return Api.login(userData).then((response) => {
      commit('LOGIN_SUCCESS', response.data);
      return Promise.resolve(response.data.token);
    }).catch(() => {
      commit('LOGIN_FAILURE');
    });
  },
  LOGOUT({ commit }) {
    tokenService.removeToken();
    commit('LOGOUT');
  },
  VERIFY_USER_AUTHENTICATED({ commit }, token) {
    if (!tokenService.getAuthorizationHeader()) {
      tokenService.setAuthorizationHeader(token);
    }

    return Api.verifyUserAuthenticated().then(() => {
      commit('USER_AUTHENTICATED_SUCCESS');

      return Promise.resolve({ isAuthenticated: true });
    }).catch(() => {
      commit('USER_AUTHENTICATED_FAILURE');

      return Promise.reject();
    });
  }
};

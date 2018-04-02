import Api from '../../api/register';

export default {
  REGISTER({ commit }, userData) {
    commit('REGISTER');

    return Api.register(userData).then((response) => {
      commit('REGISTER_SUCCESS', response.data);
      return Promise.resolve(response.data);
    }).catch(() => {
      commit('REGISTER_FAILURE');
    });
  }
};

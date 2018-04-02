export default {
  LOGIN(state) {
    state.user.isLoading = true;
  },
  LOGIN_SUCCESS(state, data) {
    state.user.isAuthenticated = true;
    state.user.isLoading = false;
    state.user.data = data;
  },
  LOGIN_FAILURE(state) {
    state.user.isLoading = false;
    state.user.data = {};
  },
  LOGOUT(state) {
    state.user.isAuthenticated = false;
    state.user.data = {};
  },
  USER_AUTHENTICATED_SUCCESS(state) {
    state.user.isAuthenticated = true;
  },
  USER_AUTHENTICATED_FAILURE(state) {
    state.user.isAuthenticated = false;
  }
};

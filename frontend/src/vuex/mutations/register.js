export default {
  REGISTER(state) {
    state.registration.isLoading = true;
  },
  REGISTER_SUCCESS(state) {
    state.registration.isLoading = false;
  },
  REGISTER_FAILURE(state) {
    state.registration.isLoading = false;
  }
};

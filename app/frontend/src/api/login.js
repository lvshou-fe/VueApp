import axiosInstance from './index';

export default {
  login: userData => axiosInstance.post('/user/login', userData),
  verifyUserAuthenticated: () => axiosInstance.get('/user/me')
};

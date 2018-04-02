import axiosInstance from './index';

export default {
  register: userData => axiosInstance.post('/user/create', userData)
};

/* eslint-disable dot-notation */
import axiosInstance from '../api';

export const APP_TOKEN = 'app_token';

const setToken = token => localStorage.setItem(APP_TOKEN, token);

const removeToken = () => localStorage.removeItem(APP_TOKEN);

const getToken = () => localStorage.getItem(APP_TOKEN);

/**
 * Sets the authorization token to the axios instance from the localStorage or
 * from function attribute. On the first run, when user is not authenticated,
 * there will be no token available.
 * @param {string} token
 */
const setAuthorizationHeader = (token) => {
  const usedToken = !token ? getToken() : token;

  if (usedToken) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

const getAuthorizationHeader = () => axiosInstance.defaults.headers.common['Authorization'];

export default {
  setToken,
  removeToken,
  getToken,
  setAuthorizationHeader,
  getAuthorizationHeader
};

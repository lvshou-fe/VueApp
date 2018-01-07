import axios from 'axios';

import config from '../config';

const axiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;

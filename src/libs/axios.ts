import axios from 'axios';

export const Axios = axios.create({
  baseURL: window.APP_CONFIG.BACKEND_URL,
  withCredentials: true,
});

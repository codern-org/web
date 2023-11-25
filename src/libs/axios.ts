import { deserializeDate } from '@/libs/utils';
import axios from 'axios';

export const Axios = axios.create({
  baseURL: window.APP_CONFIG.BACKEND_URL,
  withCredentials: true,
});

Axios.interceptors.response.use((response) => {
  if (response.data.data) deserializeDate(response.data.data);
  return response;
});

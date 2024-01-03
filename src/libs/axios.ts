import { deserializeDate } from '@/libs/utils';
import axios from 'axios';
import JSONBigInt from 'json-bigint';

export const Axios = axios.create({
  baseURL: window.APP_CONFIG.BACKEND_URL,
  withCredentials: true,
});

const JSONBigIntParser = JSONBigInt({ useNativeBigInt: true });

Axios.interceptors.request.use((request) => {
  // Prevent default behaviour of parsing the response with JSON.parse
  request.transformResponse = [(data) => data];
  return request;
});

Axios.interceptors.response.use((response) => {
  try {
    response.data = JSONBigIntParser.parse(response.data);
  } catch {
    // In case of file content, etc.
  }
  if (response.data.data) deserializeDate(response.data.data);
  return response;
});

// Hacky way for tanstack-query cache key
BigInt.prototype.toJSON = function () {
  return this.toString();
};

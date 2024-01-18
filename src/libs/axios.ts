import { JSONBigIntParser, deserializeDate } from '@/libs/utils';
import axios from 'axios';

export const Axios = axios.create({
  baseURL: window.APP_CONFIG.BACKEND_URL,
  withCredentials: true,
});

Axios.interceptors.request.use((request) => {
  request.transformResponse = [
    (data, headers) => {
      if (headers['content-type'] === 'application/json') {
        try {
          data = JSONBigIntParser.parse(data);
        } catch {
          try {
            data = JSON.parse(data);
          } catch {
            // Ignore JSON parsing error
          }
        }
        if (data.data) deserializeDate(data.data);
      }
      return data;
    },
  ];
  return request;
});

// Hacky way for tanstack-query cache key
BigInt.prototype.toJSON = function () {
  return this.toString();
};

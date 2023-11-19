import axios from 'axios';
import { parseISO } from 'date-fns';

export const Axios = axios.create({
  baseURL: window.APP_CONFIG.BACKEND_URL,
  withCredentials: true,
});

Axios.interceptors.response.use((response) => {
  if (response.data.data) deserializeDate(response.data.data);
  return response;
});

const ISO_DATE_FORMAT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

const isIsoDateString = (value: unknown): value is string => {
  return typeof value === 'string' && ISO_DATE_FORMAT.test(value);
};

// Parse response data from ISO date string to JavaScript date object recursively
const deserializeDate = (data: unknown) => {
  if (data === null || data === undefined || typeof data !== 'object') return data;
  if (isIsoDateString(data)) return parseISO(data);

  for (const [key, value] of Object.entries(data)) {
    if (isIsoDateString(value)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      data[key] = parseISO(value);
    } else if (typeof value === 'object') {
      deserializeDate(value);
    }
  }
  return data;
};

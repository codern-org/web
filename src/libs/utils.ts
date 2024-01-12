import clsx, { ClassValue } from 'clsx';
import { formatDistance as formatDateDistFns, format as formatDateFns, parseISO } from 'date-fns';
import JSONBigInt from 'json-bigint';
import { Children, ReactElement, isValidElement } from 'react';
import { twMerge } from 'tailwind-merge';

export const classNames = (...classes: ClassValue[]) => {
  return twMerge(clsx(classes));
};

export const compactNumber = (number: number) =>
  Intl.NumberFormat('en', { notation: 'compact' }).format(number);

export const commasNumber = (number: number) => Intl.NumberFormat('en').format(number);

export const getValidChildren = (children: React.ReactNode) => {
  return Children.toArray(children).filter((child) => isValidElement(child)) as ReactElement[];
};

export const resolveFileUrl = (url: string) => {
  if (
    !url.startsWith('/src/assets/') && // Local development
    !url.startsWith('/assets/') && // Production build
    !url.startsWith('blob:') // Blob for local file display
  ) {
    return window.APP_CONFIG.BACKEND_URL + '/file' + url;
  }
  return url;
};

export const formatDate = (date: Date, format: string) => formatDateFns(date, format);

export const formartDateDist = (
  date: Date,
  base: Date,
  options?: {
    includeSeconds?: boolean;
    addSuffix?: boolean;
    locale?: Locale;
  },
) => formatDateDistFns(date, base, options);

const ISO_DATE_FORMAT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

export const isIsoDateString = (value: unknown): value is string => {
  return typeof value === 'string' && ISO_DATE_FORMAT.test(value);
};

export const JSONBigIntParser = JSONBigInt({ useNativeBigInt: true });

// Parse response data from ISO date string to JavaScript date object recursively
export const deserializeDate = (data: unknown) => {
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

export const getBlobFromUrl = async (url: string) => {
  const response = await fetch(url);
  return response.blob();
};

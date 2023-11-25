import clsx, { ClassValue } from 'clsx';
import { formatDistance as formatDateDistFns, format as formatDateFns, parseISO } from 'date-fns';
import { Children, ReactElement, isValidElement } from 'react';
import { twMerge } from 'tailwind-merge';

export const classNames = (...classes: ClassValue[]) => {
  return twMerge(clsx(classes));
};

export const compactNumber = (number: number) => {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(number);
};

export const getValidChildren = (children: React.ReactNode) => {
  return Children.toArray(children).filter((child) => isValidElement(child)) as ReactElement[];
};

export const formatDate = (date: Date, format: string) => formatDateFns(date, format);

export const formartDateDist = (date: Date, base: Date) => formatDateDistFns(date, base);

const ISO_DATE_FORMAT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

export const isIsoDateString = (value: unknown): value is string => {
  return typeof value === 'string' && ISO_DATE_FORMAT.test(value);
};

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

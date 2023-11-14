import clsx, { ClassValue } from 'clsx';
import { format as formateDateFns } from 'date-fns';
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

export const formatDate = (date: Date, format: string) => formateDateFns(date, format);

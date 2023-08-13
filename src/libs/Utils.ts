import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const classNames = (...classes: ClassValue[]) => {
  return twMerge(clsx(classes));
};

export const compactNumber = (number: number) => {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(number);
};

import { classNames } from '@/libs/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { InputHTMLAttributes, forwardRef } from 'react';

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        base: '',
        file: 'file:border-0 file:bg-transparent file:text-sm file:font-medium',
      },
    },
    defaultVariants: {
      variant: 'base',
    },
  },
);

export type InputProps = InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof inputVariants>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={classNames(inputVariants({ className, variant }))}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

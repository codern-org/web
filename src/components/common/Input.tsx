import { classNames } from '@/libs/Utils';
import { VariantProps, cva } from 'class-variance-authority';
import { InputHTMLAttributes, forwardRef } from 'react';

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-2 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
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

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

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

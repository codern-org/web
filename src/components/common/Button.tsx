import { classNames } from '@/libs/Utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';

const buttonVariants = cva(
  'flex items-center justify-center rounded-md border text-sm font-medium duration-100 ease-in focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'border-primary bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary',
        secondary:
          'border-secondary text-secondary-foreground hover:border-primary hover:text-primary',
      },
      size: {
        sm: 'h-8 px-3',
        base: 'h-10 px-4 py-2',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'base',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(buttonVariants({ className, variant, size }))}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

import { classNames } from '@/libs/Utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';

const buttonVariants = cva(
  'flex items-center justify-center rounded-md text-sm duration-100 ease-in focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        base: 'border border-primary bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary',
        secondary:
          'border border-secondary text-secondary-foreground hover:border-primary hover:text-primary',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-9 px-3',
        base: 'h-10 px-4 py-2',
        lg: '',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'base',
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

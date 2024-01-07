import { classNames } from '@/libs/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        base: 'border border-primary bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary',
        secondary:
          'border border-input text-secondary-foreground hover:border-primary hover:text-primary',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        danger:
          'border border-danger bg-danger text-primary-foreground hover:bg-primary-foreground hover:text-danger',
      },
      size: {
        sm: 'h-9 px-3',
        base: 'h-10 px-4 py-2',
        lg: 'h-11 px-8',
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

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        ref={ref}
        className={classNames(buttonVariants({ className, variant, size }))}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

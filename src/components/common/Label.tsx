import { classNames } from '@/libs/Utils';
import * as LabelPrimitive from '@radix-ui/react-label';
import { VariantProps, cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

export interface LabelProps
  extends ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

export const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, ...props }, ref) => {
    console.log(labelVariants());
    return (
      <LabelPrimitive.Root
        ref={ref}
        className={classNames(labelVariants(), className)}
        {...props}
      />
    );
  },
);
Label.displayName = LabelPrimitive.Root.displayName;

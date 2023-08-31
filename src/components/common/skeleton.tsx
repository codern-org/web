import { classNames } from '@/libs/utils';
import { HTMLAttributes } from 'react';

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={classNames('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
};

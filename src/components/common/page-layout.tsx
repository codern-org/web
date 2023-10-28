import { Footer } from '@/components/common/footer';
import { classNames } from '@/libs/utils';
import { HTMLAttributes } from 'react';

export const PageLayout = ({ className, children }: HTMLAttributes<HTMLElement>) => {
  return (
    <>
      <main className={classNames('relative min-h-screen', className)}>{children}</main>
      <Footer />
    </>
  );
};

import { Footer } from '@/components/common/footer';
import { ReactNode } from 'react';

export type PageLayoutProps = {
  children: ReactNode;
};

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <main className="relative flex h-screen min-h-screen flex-col">{children}</main>
      <Footer />
    </>
  );
};

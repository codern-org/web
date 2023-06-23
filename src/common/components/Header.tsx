import { CodernLogo } from '@/common/branding/CodernLogo';
import { ReactNode } from 'react';

type HeaderProps = {
  children?: ReactNode;
};

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="container flex items-center py-4">
        <CodernLogo />
        {children}
      </div>
    </header>
  );
};

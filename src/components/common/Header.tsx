import { CodernLogo } from '@/components/branding/CodernLogo';
import { ReactNode } from 'react';

type HeaderProps = {
  children?: ReactNode;
};

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-primary-foreground">
      <div className="container flex items-center py-2">
        <CodernLogo />
        {children}
      </div>
    </header>
  );
};

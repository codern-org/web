import { CodernLogo } from '@/components/branding/CodernLogo';
import { classNames } from '@/libs/Utils';
import { ReactNode } from 'react';

type NavigationBarProps = {
  children?: ReactNode;
  className?: string;
};

export const NavigationBar = ({ children, className }: NavigationBarProps) => {
  return (
    <nav
      className={classNames('sticky top-0 z-40 w-full border-b bg-primary-foreground', className)}
    >
      <div className="container flex items-center py-2">
        <CodernLogo />
        <div className="ml-auto flex flex-row items-center space-x-2">{children}</div>
      </div>
    </nav>
  );
};

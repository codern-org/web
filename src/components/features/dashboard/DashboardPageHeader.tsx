import { Button } from '@/components/common/Button';
import { NavigationBar } from '@/components/common/NavigationBar';
import { UserProfileDropdown } from '@/components/common/UserProfileDropdown';
import { User, UserAccountType } from '@/types/AuthTypes';
import { BellIcon, PlusIcon } from 'lucide-react';

type DashboardPageNavigationBarProps = {
  user: User | undefined;
  className?: string;
};

export const DashboardPageNavigationBar = ({
  user,
  className,
}: DashboardPageNavigationBarProps) => {
  return (
    <NavigationBar className={className}>
      {user?.accountType && user.accountType === UserAccountType.PRO && (
        <Button
          variant="secondary"
          size="sm"
        >
          <PlusIcon className="mr-1 h-4 w-4 " />
          Create workspace
        </Button>
      )}

      <Button
        variant="outline"
        size="icon-sm"
        className="relative rounded-full"
      >
        <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-danger"></div>
        <BellIcon className="h-4 w-4" />
      </Button>

      {user && (
        <UserProfileDropdown
          displayName={user.displayName}
          email={user.email}
          accountType={user.accountType}
        />
      )}
    </NavigationBar>
  );
};

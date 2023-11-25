import { Button } from '@/components/common/button';
import { NavigationBar, NavigationBarProps } from '@/components/common/navigation-bar';
import { UserProfileDropdown } from '@/components/common/user-profile-dropdown';
import { useUser } from '@/hooks/auth-hook';
import { BellIcon } from 'lucide-react';

export const DashboardNavBar = (props: NavigationBarProps) => {
  const { data: user } = useUser();

  return (
    <NavigationBar {...props}>
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
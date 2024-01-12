import { NavigationBar, NavigationBarProps } from '@/components/common/navigation-bar';
import { UserProfileDropdown } from '@/components/common/user-profile-dropdown';
import { useAuth } from '@/hooks/auth-hook';

export const DashboardNavBar = (props: NavigationBarProps) => {
  const { user } = useAuth();

  return (
    <NavigationBar {...props}>
      {/* TODO: notification */}
      {/* <Button
        variant="outline"
        size="icon-sm"
        className="relative rounded-full"
      >
        <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-danger"></div>
        <BellIcon className="h-4 w-4" />
      </Button> */}

      {user.data && (
        <UserProfileDropdown
          displayName={user.data.displayName}
          email={user.data.email}
          accountType={user.data.accountType}
        />
      )}
    </NavigationBar>
  );
};

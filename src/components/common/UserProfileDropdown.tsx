import { Button } from '@/components/common/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/Dropdown';
import { RoutePath } from '@/libs/Constants';
import { authService } from '@/services/AuthService';
import { UserAccountType } from '@/types/AuthTypes';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronDownIcon, LogOutIcon, SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type UserProfileDropdownProps = {
  displayName: string;
  email: string;
  accountType: UserAccountType;
};

export const UserProfileDropdown = ({
  displayName,
  email,
  accountType,
}: UserProfileDropdownProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signOut = () => {
    authService.signOut().finally(() => {
      queryClient.removeQueries();
      navigate(RoutePath.SIGNIN);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-row items-center space-x-1 rounded-sm focus-visible:outline-none">
        <div className="h-8 w-8 flex-none rounded-md bg-muted-foreground" />
        <ChevronDownIcon className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={signOut}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {accountType !== UserAccountType.PRO && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button
                size="sm"
                className="w-full"
              >
                Upgrade to Pro
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

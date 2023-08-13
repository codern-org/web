import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/Dropdown';
import { classNames } from '@/libs/Utils';
import { ChevronDownIcon, LogOutIcon, SettingsIcon } from 'lucide-react';

type UserProfileDropdownProps = {
  className: string;
  displayName: string;
};

export const UserProfileDropdown = ({ className, displayName }: UserProfileDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={classNames(
          'flex flex-row items-center space-x-1 rounded-sm focus-visible:outline-none',
          className,
        )}
      >
        <div className="h-8 w-8 flex-none rounded-md bg-muted-foreground" />
        <ChevronDownIcon className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48"
      >
        <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

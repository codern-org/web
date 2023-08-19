import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/Dropdown';
import { authService } from '@/services/AuthService';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronDownIcon, LogOutIcon, SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type UserProfileDropdownProps = {
  displayName: string;
};

export const UserProfileDropdown = ({ displayName }: UserProfileDropdownProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signOut = () => {
    authService.signOut().finally(() => {
      queryClient.removeQueries();
      navigate('/');
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
          <DropdownMenuItem onClick={signOut}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

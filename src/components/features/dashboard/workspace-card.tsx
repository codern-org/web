import { Badge } from '@/components/common/badge';
import { Button } from '@/components/common/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/dropdown';
import { Image } from '@/components/common/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/common/tooltip';
import { RoutePath, WorkspaceContent } from '@/libs/constants';
import { compactNumber } from '@/libs/utils';
import { Workspace, WorkspaceRole } from '@/types/workspace-type';
import { BookOpenIcon, MoreVerticalIcon, SettingsIcon, StarIcon, Users2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';

type WorkspaceCardProps = {
  workspace: Workspace;
};

export const WorkspaceCard = ({ workspace }: WorkspaceCardProps) => {
  const {
    id,
    name,
    profileUrl,
    ownerName,
    totalAssignment,
    completedAssignment,
    role,
    participantCount,
  } = workspace;
  const progress = totalAssignment ? (completedAssignment / totalAssignment) * 100 : 0;

  return (
    <Card className="bg-background transition-colors hover:border-primary">
      <Link to={RoutePath.WORKSPACE(Number(id), WorkspaceContent.ASSIGNMENT)}>
        <CardHeader className="flex flex-row justify-between">
          <div className="flex flex-row items-center space-x-3">
            <Image
              src={profileUrl}
              className="h-11 w-11 rounded-md"
              alt=""
            />
            <div className="flex flex-col">
              <CardTitle className="mb-1 text-lg leading-tight">{name}</CardTitle>
              <div className="text-sm">{ownerName}</div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="p-2 text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                variant="ghost"
              >
                <MoreVerticalIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
              <DropdownMenuItem>
                <StarIcon className="mr-2 h-4 w-4" /> Favorite
              </DropdownMenuItem>
              {[WorkspaceRole.ADMIN, WorkspaceRole.OWNER].includes(workspace.role) && (
                <DropdownMenuItem asChild>
                  <Link to={RoutePath.FALLBACK_WORKSPACE_SETTINGS(workspace.id)}>
                    <SettingsIcon className="mr-2 h-4 w-4" /> Settings
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex">
          <Badge
            variant="muted"
            className="mr-3 space-x-1 rounded-md font-normal"
          >
            <Users2Icon className="h-5 w-5" />
            <span className="text-sm">{compactNumber(participantCount || 0)}</span>
          </Badge>
          <Badge
            variant="muted"
            className="mr-3 space-x-1 rounded-md font-normal"
          >
            <BookOpenIcon className="h-4 w-4" />
            <span className="text-sm">{totalAssignment || 0}</span>
          </Badge>
          {role === WorkspaceRole.MEMBER && (
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger className="flex w-full items-center space-x-3">
                  <div className="h-1 w-full rounded bg-muted">
                    <div
                      className="h-1 rounded bg-primary"
                      style={{ width: progress + '%' }}
                    />
                  </div>
                  <div className="text-xs">{progress}%</div>
                </TooltipTrigger>
                <TooltipContent>
                  Assignment progression: {completedAssignment}/{totalAssignment}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {role !== WorkspaceRole.MEMBER && (
            <Badge className="ml-auto capitalize">{role.toLowerCase()}</Badge>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

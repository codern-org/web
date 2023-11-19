import { Badge } from '@/components/common/badge';
import { Button } from '@/components/common/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/card';
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
import { RoutePath } from '@/libs/constants';
import { compactNumber, formatDate } from '@/libs/utils';
import { Workspace, WorkspaceRole } from '@/types/workspace-type';
import { BookOpenIcon, MoreVerticalIcon, StarIcon, Users2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type WorkspaceCardProps = {
  workspace: Workspace;
};

export const WorkspaceCard = ({ workspace }: WorkspaceCardProps) => {
  const navigate = useNavigate();

  const {
    id,
    name,
    profileUrl,
    totalAssignment,
    completedAssignment,
    role,
    participantCount,
    joinedAt,
  } = workspace;
  const progress = totalAssignment ? (completedAssignment / totalAssignment) * 100 : 0;

  return (
    <Card
      className="bg-background transition-colors hover:border-primary"
      onClick={() => {
        if (role === WorkspaceRole.MEMBER) {
          navigate(RoutePath.WORKSPACE.replace(':workspaceId', id.toString()));
        } else {
          navigate(RoutePath.ORGANIZER_WORKSPACE.replace(':workspaceId', id.toString()));
        }
      }}
    >
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center space-x-3">
          <Image
            src={profileUrl}
            className="h-10 w-10 flex-none rounded-md"
            alt=""
          />
          <CardTitle className="text-lg">{name}</CardTitle>
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
              <StarIcon className="mr-2 h-4 w-4" />
              <span>Favorite</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex space-x-3">
        <Badge
          variant="muted"
          className="space-x-1 rounded-md font-normal"
        >
          <Users2Icon className="h-5 w-5" />
          <span className="text-sm">{compactNumber(participantCount || 0)}</span>
        </Badge>
        <Badge
          variant="muted"
          className="space-x-1 rounded-md font-normal"
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
                Assignment progession: {completedAssignment}/{totalAssignment}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-muted-foreground">
          Joined at: {formatDate(joinedAt, 'dd MMM yyyyy')}
        </div>
        {role !== WorkspaceRole.MEMBER && (
          <Badge className="capitalize">{role.toLowerCase()}</Badge>
        )}
      </CardFooter>
    </Card>
  );
};

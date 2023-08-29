import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/Card';
import { RoutePath } from '@/libs/Constants';
import { compactNumber } from '@/libs/Utils';
import { Workspace } from '@/types/WorkspaceTypes';
import { BookOpenIcon, Users2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type WorkspaceCardProps = {
  workspace: Workspace;
};

export const WorkspaceCard = ({ workspace }: WorkspaceCardProps) => {
  const navigate = useNavigate();

  const { id, name, profileUrl, ownerName, totalAssignment, progression, participantCount } =
    workspace;

  return (
    <Card
      className="transition-colors hover:border-primary"
      onClick={() => navigate(RoutePath.WORKSPACE_DASHBOARD.replace(':workspaceId', id.toString()))}
    >
      <CardHeader className="flex-row items-center space-x-3">
        <img
          src={profileUrl}
          className="h-10 w-10 flex-none rounded-md"
          alt=""
        />
        <div className="mb-1 flex flex-col">
          <CardTitle className="text-base">{name}</CardTitle>
          <span className="text-xs text-muted-foreground">{ownerName}</span>
        </div>
      </CardHeader>
      <CardContent className="flex items-center space-x-2">
        <div className="inline-flex items-center space-x-1 rounded-md bg-accent px-2 py-0.5 text-accent-foreground">
          <BookOpenIcon className="h-4 w-4" />
          <span className="text-sm">
            {progression}/{totalAssignment}
          </span>
        </div>
        <div className="inline-flex items-center space-x-1 rounded-md bg-accent px-2 py-0.5 text-accent-foreground">
          <Users2Icon className="h-5 w-5" />
          <span className="text-sm">{compactNumber(participantCount || 0)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-1 w-full bg-muted">
          <div
            className="h-1 rounded bg-primary"
            style={{
              width:
                (progression && totalAssignment ? (progression / totalAssignment) * 100 : 0) + '%',
            }}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

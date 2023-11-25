import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/card';
import { Image } from '@/components/common/image';
import { RoutePath, WorkspaceContent } from '@/libs/constants';
import { compactNumber } from '@/libs/utils';
import { Workspace } from '@/types/workspace-type';
import { BookOpenIcon, Users2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type OrganizerWorkspaceCardProps = {
  workspace: Workspace;
};

export const OrganizerWorkspaceCard = ({ workspace }: OrganizerWorkspaceCardProps) => {
  const navigate = useNavigate();

  const { id, name, profileUrl, ownerName, totalAssignment, participantCount } = workspace;

  return (
    <Card
      className="transition-colors hover:border-primary"
      onClick={() => navigate(RoutePath.WORKSPACE(Number(id), WorkspaceContent.ASSIGNMENT))}
    >
      <CardHeader className="flex-row items-center space-x-3">
        <Image
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
          <span className="text-sm">{totalAssignment}</span>
        </div>
        <div className="inline-flex items-center space-x-1 rounded-md bg-accent px-2 py-0.5 text-accent-foreground">
          <Users2Icon className="h-5 w-5" />
          <span className="text-sm">{compactNumber(participantCount || 0)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

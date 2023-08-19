import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/Card';
import { compactNumber } from '@/libs/Utils';
import { Workspace } from '@/types/WorkspaceType';
import { BookOpenIcon, Users2Icon } from 'lucide-react';

type WorkspaceCardProps = Pick<
  Workspace,
  'name' | 'owner' | 'participants' | 'completeQuestions' | 'totalQuestions'
>;

export const WorkspaceCard = ({
  name,
  owner,
  participants,
  completeQuestions,
  totalQuestions,
}: WorkspaceCardProps) => {
  return (
    <Card className="transition-colors hover:border-primary">
      <CardHeader className="flex-row items-center space-x-3">
        <div className="h-10 w-10 flex-none rounded-md bg-muted-foreground" />
        <div className="mb-1 flex flex-col">
          <CardTitle className="text-base">{name}</CardTitle>
          <span className="text-xs text-muted-foreground">{owner}</span>
        </div>
      </CardHeader>
      <CardContent className="flex items-center space-x-2">
        <div className="inline-flex items-center space-x-1 rounded-md bg-accent px-2 py-0.5">
          <BookOpenIcon className="h-4 w-4 text-accent-foreground" />
          <span className="text-sm">
            {completeQuestions}/{totalQuestions}
          </span>
        </div>
        <div className="inline-flex items-center space-x-1 rounded-md bg-accent px-2 py-0.5">
          <Users2Icon className="h-5 w-5 text-accent-foreground" />
          <span className="text-sm">{compactNumber(participants)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-1 w-full bg-muted">
          <div
            className="h-1 rounded bg-primary"
            style={{ width: (completeQuestions / totalQuestions) * 100 + '%' }}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

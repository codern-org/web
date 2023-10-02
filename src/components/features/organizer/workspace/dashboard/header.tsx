import { Skeleton } from '@/components/common/skeleton';
import { useGetWorkspaceQuery } from '@/hooks/workspace-hook';
import { classNames } from '@/libs/utils';
import { HTMLAttributes } from 'react';
import { useParams } from 'react-router-dom';

export const OrganizerWorkspaceHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { workspaceId } = useParams();
  const { data: workspace } = useGetWorkspaceQuery(Number(workspaceId));

  return (
    <div
      className={classNames('flex flex-row items-center justify-between', className)}
      {...props}
    >
      <h2 className="text-3xl font-semibold tracking-tight">{workspace?.name}</h2>

      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <div>
          {workspace?.totalAssignment != null ? (
            <p className="mb-1 text-xl font-medium">{workspace?.totalAssignment}</p>
          ) : (
            <Skeleton className="mb-1 h-7 w-10" />
          )}
          <p className="text-sm text-muted-foreground">Total assignments</p>
        </div>
        <div>
          {workspace?.participantCount ? (
            <p className="mb-1 text-xl font-medium">{workspace.participantCount}</p>
          ) : (
            <Skeleton className="h-7 w-10 " />
          )}
          <p className="text-sm text-muted-foreground">People in workspace</p>
        </div>
      </div>
    </div>
  );
};

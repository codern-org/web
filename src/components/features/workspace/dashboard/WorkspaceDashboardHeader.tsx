import { Skeleton } from '@/components/common/Skeleton';
import { Workspace } from '@/types/WorkspaceTypes';
import moment from 'moment';

type WorkspaceDashboardHeaderProps = {
  workspace: Workspace | undefined;
};

export const WorkspaceDashboardHeader = ({ workspace }: WorkspaceDashboardHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <h2 className="mb-6 text-3xl font-semibold tracking-tight">{workspace?.name}</h2>

        <div className="mb-2 flex items-center space-x-3">
          <div className="h-10 w-10 flex-none rounded-full bg-muted-foreground" />
          <div>
            <p className="text-sm leading-none text-muted-foreground">Owner</p>
            <p className="text-sm font-medium">{workspace?.ownerName}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Joined at {moment(new Date()).format('dddd DD MMMM YYYY')}
        </p>
      </div>

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
          {workspace?.totalAssignment != null ? (
            // TODO: calculate progression
            <p className="mb-1 text-xl font-medium">{workspace.totalAssignment - 0}</p>
          ) : (
            <Skeleton className="mb-1 h-7 w-10" />
          )}
          <p className="text-sm text-muted-foreground">Incomplete assignments</p>
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

import { Skeleton } from '@/components/common/skeleton';
import { Workspace } from '@/types/workspace-type';

type WorkspaceDashboardHeaderProps = {
  workspace: Workspace | undefined;
};

export const WorkspaceDashboardHeader = ({ workspace }: WorkspaceDashboardHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <h2 className="mb-6 text-3xl font-semibold tracking-tight">{workspace?.name}</h2>

        <div className="mb-2 flex items-center space-x-3">
          <div className="h-10 w-10 flex-none rounded-full bg-secondary-foreground" />
          <div>
            <p className="text-sm leading-none text-secondary-foreground">Owner</p>
            <p className="text-sm font-medium">{workspace?.ownerName}</p>
          </div>
        </div>

        {/* TODO */}
        {/* <p className="text-sm text-secondary-foreground">
          Joined at {dayjs(new Date()).format('dddd DD MMMM YYYY')}
        </p> */}
      </div>

      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <div>
          {workspace?.totalAssignment != null ? (
            <p className="mb-1 text-xl font-medium">{workspace?.totalAssignment}</p>
          ) : (
            <Skeleton className="mb-1 h-7 w-10" />
          )}
          <p className="text-sm text-secondary-foreground">Total assignments</p>
        </div>
        <div>
          {workspace?.totalAssignment != null ? (
            // TODO: calculate progression
            <p className="mb-1 text-xl font-medium">{workspace.totalAssignment - 0}</p>
          ) : (
            <Skeleton className="mb-1 h-7 w-10" />
          )}
          <p className="text-sm text-secondary-foreground">Incomplete assignments</p>
        </div>
        <div>
          {workspace?.participantCount ? (
            <p className="mb-1 text-xl font-medium">{workspace.participantCount}</p>
          ) : (
            <Skeleton className="h-7 w-10 " />
          )}
          <p className="text-sm text-secondary-foreground">People in workspace</p>
        </div>
      </div>
    </div>
  );
};

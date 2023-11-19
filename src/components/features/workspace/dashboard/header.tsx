import { Image } from '@/components/common/image';
import { MojiBun } from '@/components/common/moji-bun';
import { Skeleton } from '@/components/common/skeleton';
import { WorkspaceBreadcrumb } from '@/components/features/workspace/dashboard/breadcrumb';
import { useGetWorkspaceQuery, useListAssignmentQuery } from '@/hooks/workspace-hook';
import { formatDate } from '@/libs/utils';
import { AssignmentStatus } from '@/types/workspace-type';
import { useParams } from 'react-router-dom';

export const WorkspaceHeader = () => {
  const { workspaceId } = useParams();
  const { data: workspace } = useGetWorkspaceQuery(Number(workspaceId));
  const { data: assignments } = useListAssignmentQuery(Number(workspaceId));

  const completedAssignments = assignments?.filter(
    (assignment) => assignment.status === AssignmentStatus.COMPLETED,
  );

  return (
    <div className="border-b bg-background">
      <div className="container">
        <WorkspaceBreadcrumb className="pt-6" />

        <div className="flex flex-row items-center justify-between space-x-8 py-8">
          <div className="flex flex-col">
            {workspace ? (
              <h2 className="mb-6 text-3xl font-semibold tracking-tight">{workspace.name}</h2>
            ) : (
              <Skeleton className="mb-6 h-9 w-48" />
            )}

            <div className="mb-6 flex items-center space-x-3">
              <Image
                src={workspace?.ownerProfileUrl}
                alt=""
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm leading-none text-muted-foreground">Owner</p>
                <p className="text-sm font-medium">{workspace?.ownerName}</p>
              </div>
            </div>

            {workspace ? (
              <p className="text-xs text-secondary-foreground">
                Joined at {formatDate(workspace.joinedAt, 'EEEE, d MMMM yyyy')}
              </p>
            ) : (
              <Skeleton className="mb-1 h-3 w-48" />
            )}
          </div>

          <div className="relative hidden overflow-hidden rounded-md border bg-gradient-to-br from-background/50 from-60% to-accent/50 shadow-lg lg:block">
            <MojiBun className="absolute -bottom-4 right-8 z-10 h-24 w-24" />
            <div className="relative z-20 grid grid-cols-2 gap-6 bg-accent/20 p-6">
              <div>
                {workspace ? (
                  <p className="mb-1 text-xl font-medium">{workspace.totalAssignment}</p>
                ) : (
                  <Skeleton className="mb-1 h-7 w-10" />
                )}
                <p className="text-sm text-muted-foreground">Total assignments</p>
              </div>
              <div>
                {workspace && completedAssignments ? (
                  <p className="mb-1 text-xl font-medium">
                    {workspace.totalAssignment - completedAssignments.length}
                  </p>
                ) : (
                  <Skeleton className="mb-1 h-7 w-10" />
                )}
                <p className="text-sm text-muted-foreground">Incompleted assignments</p>
              </div>
              <div>
                {workspace ? (
                  <p className="mb-1 text-xl font-medium">{workspace.participantCount}</p>
                ) : (
                  <Skeleton className="h-7 w-10 " />
                )}
                <p className="text-sm text-muted-foreground">People in workspace</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

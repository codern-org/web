import { Image } from '@/components/common/image';
import { MojiBun } from '@/components/common/moji-bun';
import { Skeleton } from '@/components/common/skeleton';
import { WorkspaceBreadcrumb } from '@/components/features/workspace/breadcrumb';
import { useGetWorkspaceQuery } from '@/hooks/workspace-hook';
import { formatDate } from '@/libs/utils';
import { CalendarIcon, UserIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const WorkspaceHeader = () => {
  const { workspaceId } = useParams();
  const { data: workspace } = useGetWorkspaceQuery(Number(workspaceId));

  return (
    <div className="border-b bg-background">
      <div className="container">
        <WorkspaceBreadcrumb className="pt-6" />

        <div className="flex items-center justify-between space-x-8 py-8">
          <div className="flex flex-col space-y-12">
            <div className="flex items-center space-x-3">
              <Image
                src={workspace?.profileUrl}
                alt=""
                className="h-11 w-11 rounded-md"
              />
              {workspace ? (
                <h2 className="text-4xl font-semibold tracking-tight">{workspace.name}</h2>
              ) : (
                <Skeleton className="h-9 w-48" />
              )}
            </div>
            <div className="flex items-center space-x-6">
              <div>
                <p className="mb-1 flex items-center text-sm leading-none text-muted-foreground">
                  <UserIcon className="mr-1 h-4 w-4" />
                  Owner
                </p>
                {workspace ? (
                  <p className="text-sm font-medium">{workspace.ownerName}</p>
                ) : (
                  <Skeleton className="mt-2 h-3 w-24" />
                )}
              </div>
              <div>
                <p className="mb-1 flex items-center text-sm leading-none text-muted-foreground">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  Joined
                </p>
                {workspace ? (
                  <p className="text-sm font-medium">
                    {formatDate(workspace.joinedAt, 'EEEE, d MMMM yyyy')}
                  </p>
                ) : (
                  <Skeleton className="mb-1 h-3 w-48" />
                )}
              </div>
            </div>
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
                {workspace ? (
                  <p className="mb-1 text-xl font-medium">
                    {workspace.totalAssignment - workspace.completedAssignment}
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
                  <Skeleton className="mb-1 h-7 w-10" />
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

import { Skeleton } from '@/components/common/skeleton';
import { OrganizerWorkspaceBreadcrumb } from '@/components/features/organizer/workspace/dashboard/breadcrumb';
import { useGetWorkspaceQuery } from '@/hooks/workspace-hook';
import { useParams } from 'react-router-dom';

export const OrganizerWorkspaceHeader = () => {
  const { workspaceId } = useParams();
  const { data: workspace } = useGetWorkspaceQuery(Number(workspaceId));

  return (
    <div className="border-b bg-background">
      <div className="container">
        <OrganizerWorkspaceBreadcrumb className="pt-6" />

        <div className="flex flex-row items-center justify-between py-8">
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
      </div>
    </div>
  );
};

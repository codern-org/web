import { WorkspaceCardSkeleton } from '@/components/features/dashboard/card-skeleton';
import { OrganizerWorkspaceCard } from '@/components/features/organizer/dashboard/card';
import { useGetUserQuery } from '@/hooks/auth-hook';
import { useListWorkspaceQuery } from '@/hooks/workspace-hook';

export const OrganizerDashboardContent = () => {
  const { data: user } = useGetUserQuery();
  const { data: workspaces } = useListWorkspaceQuery();

  return (
    <>
      <div className="flex flex-col">
        <h2 className="mb-3 text-lg font-semibold">All Workspaces</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {workspaces &&
            user &&
            workspaces.map((workspace) => (
              <OrganizerWorkspaceCard
                key={workspace.id}
                workspace={workspace}
              />
            ))}
          {!workspaces && <WorkspaceCardSkeleton />}
        </div>

        {workspaces && workspaces.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Looks like you haven't owned any workspaces yet
          </p>
        )}
      </div>
    </>
  );
};

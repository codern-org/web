import { WorkspaceCard } from '@/components/features/dashboard/card';
import { WorkspaceCardSkeleton } from '@/components/features/dashboard/card-skeleton';
import { Workspace } from '@/types/workspace-type';

type DashboardContentProps = {
  workspaces: Workspace[] | undefined;
  recentWorkspaces: Workspace[] | undefined;
};

export const DashboardContent = ({ workspaces, recentWorkspaces }: DashboardContentProps) => {
  return (
    <>
      {recentWorkspaces && recentWorkspaces.length > 0 && (
        <div className="flex flex-col">
          <h2 className="mb-3 text-lg font-semibold">Recent Workspaces</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {recentWorkspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                workspace={workspace}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col">
        <h2 className="mb-3 text-lg font-semibold">All Workspaces</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {workspaces &&
            workspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                workspace={workspace}
              />
            ))}
          {!workspaces && <WorkspaceCardSkeleton />}
        </div>

        {workspaces && workspaces.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Looks like you haven't joined any workspaces yet
          </p>
        )}
      </div>
    </>
  );
};

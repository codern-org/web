import { Button } from '@/common/components/Button';
import { SearchWorkspaceInput } from '@/features/dashboard/SearchWorkspaceInput';
import { WorkspaceCard } from '@/features/dashboard/WorkspaceCard';
import { Workspace } from '@/types/WorkspaceType';

type DashboardProps = {
  workspaces: Workspace[];
};

export const Dashboard = ({ workspaces }: DashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="mt-4 flex items-center space-x-2 md:mt-0">
          <SearchWorkspaceInput />
          <Button size="sm">Add Workspace</Button>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="mb-3 text-lg font-semibold">Recent Workspaces</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <WorkspaceCard
            name="KMUTT Contest 2023"
            owner="KMUTT"
            participants={10}
            completeQuestions={12}
            totalQuestions={20}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="mb-3 text-lg font-semibold">All Workspaces</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {workspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              name={workspace.name}
              owner={workspace.owner}
              participants={workspace.participants}
              completeQuestions={workspace.completeQuestions}
              totalQuestions={workspace.totalQuestions}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
Dashboard.displayName = 'Dashboard';

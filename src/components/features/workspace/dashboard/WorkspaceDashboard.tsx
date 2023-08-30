import { WorkspaceDashboardContent } from '@/components/features/workspace/dashboard/WorkspaceDashboardContent';
import { WorkspaceDashboardHeader } from '@/components/features/workspace/dashboard/WorkspaceDashboardHeader';
import { Workspace } from '@/types/WorkspaceTypes';

type WorkspaceDashboardProps = {
  workspace: Workspace | undefined;
};

export const WorkspaceDashboard = ({ workspace }: WorkspaceDashboardProps) => {
  return (
    <>
      <div className="border-b py-8">
        <div className="container">
          <WorkspaceDashboardHeader workspace={workspace} />
        </div>
      </div>

      <div className="container py-8">
        <WorkspaceDashboardContent />
      </div>
    </>
  );
};

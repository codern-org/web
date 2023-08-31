import { WorkspaceDashboardContent } from '@/components/features/workspace/dashboard/content';
import { WorkspaceDashboardHeader } from '@/components/features/workspace/dashboard/header';
import { Workspace } from '@/types/workspace-type';

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
        <WorkspaceDashboardContent workspace={workspace} />
      </div>
    </>
  );
};

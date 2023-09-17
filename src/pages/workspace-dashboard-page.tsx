import { PageLayout } from '@/components/common/page-layout';
import { DashboardPageNavigationBar } from '@/components/features/dashboard/page-navigation-bar';
import { WorkspaceDashboardBreadcrumb } from '@/components/features/workspace/dashboard/breadcrumb';
import { WorkspaceDashboardContent } from '@/components/features/workspace/dashboard/content';
import { WorkspaceDashboardHeader } from '@/components/features/workspace/dashboard/header';
import { useGetUserQuery } from '@/hooks/auth-hook';
import { useGetWorkspaceQuery, useListAssignmentQuery } from '@/hooks/workspace-hook';
import { useParams } from 'react-router-dom';

export const WorkspaceDashboardPage = () => {
  const { workspaceId } = useParams();
  const { data: user } = useGetUserQuery();
  const { data: workspace } = useGetWorkspaceQuery(Number(workspaceId));
  const { data: assignments } = useListAssignmentQuery(Number(workspaceId));

  return (
    <PageLayout>
      <DashboardPageNavigationBar user={user} />
      <WorkspaceDashboardBreadcrumb
        workspaceName={workspace?.name}
        className="container mt-6"
      />

      <div className="border-b py-8">
        <div className="container">
          <WorkspaceDashboardHeader workspace={workspace} />
        </div>
      </div>
      <div className="container py-8">
        <WorkspaceDashboardContent
          workspace={workspace}
          assignments={assignments}
        />
      </div>
    </PageLayout>
  );
};

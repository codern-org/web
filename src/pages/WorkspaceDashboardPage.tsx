import { Footer } from '@/components/common/Footer';
import { DashboardPageNavigationBar } from '@/components/features/dashboard/DashboardPageHeader';
import { WorkspaceDashboard } from '@/components/features/workspace/dashboard/WorkspaceDashboard';
import { WorkspaceDashboardBreadcrumb } from '@/components/features/workspace/dashboard/WorkspaceDashboardBreadcrumb';
import { useGetUserQuery } from '@/hooks/AuthHook';
import { useGetWorkspaceQuery } from '@/hooks/WorkspaceHook';
import { useParams } from 'react-router-dom';

export const WorkspaceDashboardPage = () => {
  const { workspaceId } = useParams();
  const { data: user } = useGetUserQuery();
  const { data: workspace } = useGetWorkspaceQuery(Number(workspaceId), ['ownerName']);

  return (
    <>
      <main className="relative min-h-screen">
        <DashboardPageNavigationBar user={user} />
        <WorkspaceDashboardBreadcrumb
          workspaceName={workspace?.name}
          className="container mt-6"
        />
        <WorkspaceDashboard workspace={workspace} />
      </main>
      <Footer />
    </>
  );
};

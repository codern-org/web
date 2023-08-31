import { Footer } from '@/components/common/footer';
import { DashboardPageNavigationBar } from '@/components/features/dashboard/page-navigation-bar';
import { WorkspaceDashboardBreadcrumb } from '@/components/features/workspace/dashboard/breadcrumb';
import { WorkspaceDashboard } from '@/components/features/workspace/dashboard/dashboard';
import { useGetUserQuery } from '@/hooks/auth-hook';
import { useGetWorkspaceQuery } from '@/hooks/workspace-hook';
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

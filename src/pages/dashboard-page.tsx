import { Footer } from '@/components/common/footer';
import { DashboardBreadcrumb } from '@/components/features/dashboard/breadcrumb';
import { Dashboard } from '@/components/features/dashboard/dashboard';
import { DashboardPageNavigationBar } from '@/components/features/dashboard/page-navigation-bar';
import { useGetUserQuery } from '@/hooks/auth-hook';
import { useListRecentWorkspaceQuery, useListWorkspaceQuery } from '@/hooks/workspace-hook';

export const DashboardPage = () => {
  const { data: user } = useGetUserQuery();
  const { data: workspaces } = useListWorkspaceQuery();
  const { data: recentWorkspaces } = useListRecentWorkspaceQuery();

  return (
    <>
      <main className="relative min-h-screen">
        <DashboardPageNavigationBar user={user} />
        <DashboardBreadcrumb className="container mt-6" />
        <Dashboard
          workspaces={workspaces}
          recentWorkspaces={recentWorkspaces}
        />
      </main>

      <Footer />
    </>
  );
};

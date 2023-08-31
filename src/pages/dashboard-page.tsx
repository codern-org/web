import { Footer } from '@/components/common/footer';
import { DashboardBreadcrumb } from '@/components/features/dashboard/breadcrumb';
import { Dashboard } from '@/components/features/dashboard/dashboard';
import { DashboardPageNavigationBar } from '@/components/features/dashboard/page-navigation-bar';
import { useGetUserQuery } from '@/hooks/auth-hook';
import { useListWorkspaceQuery } from '@/hooks/workspace-hook';

export const DashboardPage = () => {
  const { data: user } = useGetUserQuery();
  const { data: workspaces } = useListWorkspaceQuery(['ownerName']);

  return (
    <>
      <main className="relative min-h-screen">
        <DashboardPageNavigationBar user={user} />
        <DashboardBreadcrumb className="container mt-6" />
        <Dashboard
          workspaces={workspaces}
          recentWorkspaces={workspaces}
        />
      </main>

      <Footer />
    </>
  );
};

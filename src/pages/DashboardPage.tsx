import { Footer } from '@/components/common/Footer';
import { Dashboard } from '@/components/features/dashboard/Dashboard';
import { DashboardBreadcrumb } from '@/components/features/dashboard/DashboardBreadcrumb';
import { DashboardPageNavigationBar } from '@/components/features/dashboard/DashboardPageHeader';
import { useGetUserQuery } from '@/hooks/AuthHook';
import { useListWorkspaceQuery } from '@/hooks/WorkspaceHook';

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

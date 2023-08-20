import { Dashboard } from '@/components/features/dashboard/Dashboard';
import { DashboardPageHeader } from '@/components/features/dashboard/DashboardPageHeader';
import { useGetUserQuery } from '@/hooks/AuthHook';
import { useWorkspaces } from '@/stores/WorkspaceStore';

export const DashboardPage = () => {
  const { data: user } = useGetUserQuery();
  const workspaces = useWorkspaces();

  return (
    <>
      <DashboardPageHeader user={user} />

      <main className="container py-6">
        <Dashboard workspaces={workspaces} />
      </main>
    </>
  );
};

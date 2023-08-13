import { Header } from '@/components/common/Header';
import { UserProfileDropdown } from '@/components/common/UserProfileDropdown';
import { Dashboard } from '@/components/features/dashboard/Dashboard';
import { useWorkspaces } from '@/stores/WorkspaceStore';

export const DashboardPage = () => {
  const workspaces = useWorkspaces();

  return (
    <>
      <Header>
        <UserProfileDropdown
          className="ml-auto"
          displayName="Krid Heprakhone"
        />
      </Header>

      <main className="container py-6">
        <Dashboard workspaces={workspaces} />
      </main>
    </>
  );
};

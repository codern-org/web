import { Header } from '@/common/components/Header';
import { UserProfileDropdown } from '@/common/components/UserProfileDropdown';
import { Dashboard } from '@/features/dashboard/Dashboard';
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

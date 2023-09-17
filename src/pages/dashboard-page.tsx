import { PageLayout } from '@/components/common/page-layout';
import { DashboardBreadcrumb } from '@/components/features/dashboard/breadcrumb';
import { DashboardContent } from '@/components/features/dashboard/content';
import { DashboardHeader } from '@/components/features/dashboard/header';
import { DashboardPageNavigationBar } from '@/components/features/dashboard/page-navigation-bar';
import { useGetUserQuery } from '@/hooks/auth-hook';
import { useListRecentWorkspaceQuery, useListWorkspaceQuery } from '@/hooks/workspace-hook';

export const DashboardPage = () => {
  const { data: user } = useGetUserQuery();
  const { data: workspaces } = useListWorkspaceQuery();
  const { data: recentWorkspaces } = useListRecentWorkspaceQuery();

  return (
    <PageLayout>
      <DashboardPageNavigationBar user={user} />
      <DashboardBreadcrumb className="container mt-6" />

      <div className="border-b py-8">
        <DashboardHeader />
      </div>
      <div className="container space-y-6 py-8">
        <DashboardContent
          workspaces={workspaces}
          recentWorkspaces={recentWorkspaces}
        />
      </div>
    </PageLayout>
  );
};

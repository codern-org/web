import { PageLayout } from '@/components/common/page-layout';
import { DashboardPageNavigationBar } from '@/components/features/dashboard/page-navigation-bar';
import { WorkspaceDashboardBreadcrumb } from '@/components/features/workspace/dashboard/breadcrumb';
import { WorkspaceDashboardContent } from '@/components/features/workspace/dashboard/content';
import { WorkspaceDashboardHeader } from '@/components/features/workspace/dashboard/header';

export const WorkspaceDashboardPage = () => {
  return (
    <PageLayout>
      <DashboardPageNavigationBar />
      <WorkspaceDashboardBreadcrumb className="container mt-6" />

      <div className="border-b py-8">
        <div className="container">
          <WorkspaceDashboardHeader />
        </div>
      </div>
      <div className="container py-8">
        <WorkspaceDashboardContent />
      </div>
    </PageLayout>
  );
};

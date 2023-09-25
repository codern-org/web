import { PageLayout } from '@/components/common/page-layout';
import { DashboardBreadcrumb } from '@/components/features/dashboard/breadcrumb';
import { DashboardContent } from '@/components/features/dashboard/content';
import { DashboardHeader } from '@/components/features/dashboard/header';
import { PageNavigationBar } from '@/components/features/dashboard/page-navigation-bar';

export const DashboardPage = () => {
  return (
    <PageLayout>
      <PageNavigationBar />
      <DashboardBreadcrumb className="container mt-6" />

      <div className="border-b py-8">
        <DashboardHeader className="container" />
      </div>
      <div className="container py-8">
        <DashboardContent />
      </div>
    </PageLayout>
  );
};

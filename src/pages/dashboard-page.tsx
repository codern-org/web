import { PageLayout } from '@/components/common/page-layout';
import { DashboardContent } from '@/components/features/dashboard/content';
import { DashboardHeader } from '@/components/features/dashboard/header';
import { PageNavigationBar } from '@/components/features/dashboard/page-navigation-bar';

export const DashboardPage = () => {
  return (
    <PageLayout>
      <PageNavigationBar />

      <div className="min-h-screen bg-accent/20">
        <div className="border-b bg-background py-8">
          <DashboardHeader className="container" />
        </div>
        <div className="container py-8">
          <DashboardContent />
        </div>
      </div>
    </PageLayout>
  );
};

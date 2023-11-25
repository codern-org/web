import { PageLayout } from '@/components/common/page-layout';
import { withAuth } from '@/components/common/route/private-route';
import { DashboardContent } from '@/components/features/dashboard/content';
import { DashboardNavBar } from '@/components/features/dashboard/dashboard-navbar';
import { DashboardHeader } from '@/components/features/dashboard/header';

function DashboardPage() {
  return (
    <PageLayout>
      <DashboardNavBar />
      <div className="min-h-screen bg-accent/30">
        <DashboardHeader />
        <DashboardContent />
      </div>
    </PageLayout>
  );
}

export default withAuth(DashboardPage);

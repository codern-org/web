import { PageLayout } from '@/components/common/page-layout';
import { withAuth } from '@/components/common/route/private-route';
import { DashboardNavBar } from '@/components/features/dashboard/dashboard-navbar';
import { WorkspaceContent } from '@/components/features/workspace/dashboard/content';
import { WorkspaceHeader } from '@/components/features/workspace/dashboard/header';

function WorkspaceContentPage() {
  return (
    <PageLayout>
      <DashboardNavBar />
      <div className="min-h-screen bg-accent/30">
        <WorkspaceHeader />
        <WorkspaceContent />
      </div>
    </PageLayout>
  );
}

export default withAuth(WorkspaceContentPage);

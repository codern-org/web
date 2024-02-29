import { PageLayout } from '@/components/common/page-layout';
import { withAuth } from '@/components/common/route/private-route';
import { DashboardNavBar } from '@/components/features/dashboard/dashboard-navbar';
import { CreateWorkspaceForm } from '@/components/features/workspace/create-workspace-form';
import { CreateWorkspaceHeader } from '@/components/features/workspace/create-workspace-header';

function CreateWorkspacePage() {
  return (
    <PageLayout>
      <DashboardNavBar />
      <div className="min-h-screen bg-accent/30">
        <CreateWorkspaceHeader />
        <CreateWorkspaceForm />
      </div>
    </PageLayout>
  );
}

export default withAuth(CreateWorkspacePage);

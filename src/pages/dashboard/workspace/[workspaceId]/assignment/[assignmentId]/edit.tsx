import { PageLayout } from '@/components/common/page-layout';
import { withAuth } from '@/components/common/route/private-route';
import { DashboardNavBar } from '@/components/features/dashboard/dashboard-navbar';
import { CreateAssignmentForm } from '@/components/features/workspace/content/assignment/create-assignment-form';
import { CreateAssignmentHeader } from '@/components/features/workspace/content/assignment/create-assignment-header';

function EditAssignmentPage() {
  return (
    <PageLayout>
      <DashboardNavBar />
      <div className="flex min-h-screen flex-col bg-accent/30">
        <CreateAssignmentHeader />
        <CreateAssignmentForm />
      </div>
    </PageLayout>
  );
}

export default withAuth(EditAssignmentPage);

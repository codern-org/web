import { PageLayout } from '@/components/common/page-layout';
import { withAuth } from '@/components/common/route/private-route';
import { DashboardNavBar } from '@/components/features/dashboard/dashboard-navbar';
import { CreateAssignmentBreadcrumb } from '@/components/features/organizer/workspace/create-assignment/breadcrumb';
import { CreateAssignment } from '@/components/features/organizer/workspace/create-assignment/create-assignment';

function CreateAssignmentPage() {
  return (
    <PageLayout>
      <DashboardNavBar />
      <div className="bg-accent/30">
        <CreateAssignmentBreadcrumb className="container pt-6" />
        <CreateAssignment />
      </div>
    </PageLayout>
  );
}

export default withAuth(CreateAssignmentPage);

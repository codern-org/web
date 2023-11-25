import { PageLayout } from '@/components/common/page-layout';
import { withAuth } from '@/components/common/route/private-route';
import { DashboardNavBar } from '@/components/features/dashboard/dashboard-navbar';
import { AssignmentContent } from '@/components/features/workspace/assignment/content';
import { AssignmentHeader } from '@/components/features/workspace/assignment/header';

function IndividualAssignmentPage() {
  return (
    <PageLayout className="flex h-screen flex-col">
      <DashboardNavBar />
      <div className="flex h-full flex-col overflow-hidden bg-accent/30">
        <AssignmentHeader />
        <AssignmentContent />
      </div>
    </PageLayout>
  );
}

export default withAuth(IndividualAssignmentPage);

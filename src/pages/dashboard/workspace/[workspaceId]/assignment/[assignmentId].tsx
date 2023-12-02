import { PageLayout } from '@/components/common/page-layout';
import { withAuth } from '@/components/common/route/private-route';
import { AssignmentContent } from '@/components/features/assignment/content';
import { AssignmentHeader } from '@/components/features/assignment/header';
import { DashboardNavBar } from '@/components/features/dashboard/dashboard-navbar';

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

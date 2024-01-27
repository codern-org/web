import { PageLayout } from '@/components/common/page-layout';
import { withAuth } from '@/components/common/route/private-route';
import { Separator } from '@/components/common/separator';
import { AssignmentHeader } from '@/components/features/assignment/header';
import { DashboardNavBar } from '@/components/features/dashboard/dashboard-navbar';
import { SubmissionTable } from '@/components/features/workspace/content/submission/table';

function ListSubmissionPage() {
  return (
    <PageLayout>
      <DashboardNavBar />
      <div className="min-h-screen bg-accent/30">
        <div className="bg-background pb-6">
          <AssignmentHeader />
        </div>
        <Separator />
        <SubmissionTable />
      </div>
    </PageLayout>
  );
}

export default withAuth(ListSubmissionPage);

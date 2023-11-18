import { PageLayout } from '@/components/common/page-layout';
import { PageNavigationBar } from '@/components/features/dashboard/page-navigation-bar';
import { AssignmentContent } from '@/components/features/workspace/assignment/content';
import { AssignmentHeader } from '@/components/features/workspace/assignment/header';

export const AssignmentPage = () => {
  return (
    <PageLayout className="flex h-screen flex-col">
      <PageNavigationBar />

      <div className="flex h-full flex-col overflow-hidden bg-accent/30">
        <AssignmentHeader />
        <AssignmentContent />
      </div>
    </PageLayout>
  );
};

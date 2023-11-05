import { PageLayout } from '@/components/common/page-layout';
import { PageNavigationBar } from '@/components/features/dashboard/page-navigation-bar';
import { WorkspaceContent } from '@/components/features/workspace/dashboard/content';
import { WorkspaceHeader } from '@/components/features/workspace/dashboard/header';

export const WorkspacePage = () => {
  return (
    <PageLayout>
      <PageNavigationBar />

      <div className="min-h-screen bg-accent/30">
        <WorkspaceHeader />
        <WorkspaceContent />
      </div>
    </PageLayout>
  );
};

import { PageLayout } from '@/components/common/page-layout';
import { PageNavigationBar } from '@/components/features/dashboard/page-navigation-bar';
import { WorkspaceBreadcrumb } from '@/components/features/workspace/dashboard/breadcrumb';
import { WorkspaceContent } from '@/components/features/workspace/dashboard/content';
import { WorkspaceHeader } from '@/components/features/workspace/dashboard/header';

export const WorkspacePage = () => {
  return (
    <PageLayout>
      <PageNavigationBar />

      <div className="min-h-screen bg-accent/20">
        <div className="border-b bg-background">
          <WorkspaceBreadcrumb className="container pt-6" />
          <WorkspaceHeader className="container py-8" />
        </div>
        <div className="container py-8">
          <WorkspaceContent />
        </div>
      </div>
    </PageLayout>
  );
};

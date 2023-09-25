import { PageLayout } from '@/components/common/page-layout';
import { PageNavigationBar } from '@/components/features/dashboard/page-navigation-bar';
import { WorkspaceBreadcrumb } from '@/components/features/workspace/dashboard/breadcrumb';
import { WorkspaceContent } from '@/components/features/workspace/dashboard/content';
import { WorkspaceHeader } from '@/components/features/workspace/dashboard/header';

export const WorkspacePage = () => {
  return (
    <PageLayout>
      <PageNavigationBar />
      <WorkspaceBreadcrumb className="container mt-6" />

      <div className="border-b py-8">
        <WorkspaceHeader className="container" />
      </div>
      <div className="container py-8">
        <WorkspaceContent />
      </div>
    </PageLayout>
  );
};

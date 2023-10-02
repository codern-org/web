import { PageLayout } from '@/components/common/page-layout';
import { OrganizerPageNavigationBar } from '@/components/features/organizer/dashboard/page-navigation-bar';
import { OrganizerWorkspaceBreadcrumb } from '@/components/features/organizer/workspace/dashboard/breadcrumb';
import { OrganizerWorkspaceContent } from '@/components/features/organizer/workspace/dashboard/content';
import { OrganizerWorkspaceHeader } from '@/components/features/organizer/workspace/dashboard/header';

export const OrganizerWorkspacePage = () => {
  return (
    <PageLayout>
      <OrganizerPageNavigationBar />
      <OrganizerWorkspaceBreadcrumb className="container mt-6" />

      <div className="border-b py-8">
        <OrganizerWorkspaceHeader className="container" />
      </div>
      <div className="container py-8">
        <OrganizerWorkspaceContent />
      </div>
    </PageLayout>
  );
};

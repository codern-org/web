import { PageLayout } from '@/components/common/page-layout';
import { OrganizerDashboardBreadcrumb } from '@/components/features/organizer/dashboard/breadcrumb';
import { OrganizerDashboardContent } from '@/components/features/organizer/dashboard/content';
import { OrganizerDashboardHeader } from '@/components/features/organizer/dashboard/header';
import { OrganizerPageNavigationBar } from '@/components/features/organizer/dashboard/page-navigation-bar';

export const OrganizerDashboardPage = () => {
  return (
    <PageLayout>
      <OrganizerPageNavigationBar />
      <OrganizerDashboardBreadcrumb className="container mt-6" />

      <div className="border-b py-8">
        <OrganizerDashboardHeader className="container" />
      </div>
      <div className="container py-8">
        <OrganizerDashboardContent />
      </div>
    </PageLayout>
  );
};

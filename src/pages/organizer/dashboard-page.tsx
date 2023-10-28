import { PageLayout } from '@/components/common/page-layout';
import { OrganizerDashboardContent } from '@/components/features/organizer/dashboard/content';
import { OrganizerDashboardHeader } from '@/components/features/organizer/dashboard/header';
import { OrganizerPageNavigationBar } from '@/components/features/organizer/dashboard/page-navigation-bar';

export const OrganizerDashboardPage = () => {
  return (
    <PageLayout>
      <OrganizerPageNavigationBar />

      <div className="border-b py-8">
        <OrganizerDashboardHeader className="container" />
      </div>
      <div className="container py-8">
        <OrganizerDashboardContent />
      </div>
    </PageLayout>
  );
};

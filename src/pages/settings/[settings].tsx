import { PageLayout } from '@/components/common/page-layout';
import { withAuth } from '@/components/common/route/private-route';
import { DashboardNavBar } from '@/components/features/dashboard/dashboard-navbar';
import { AccountSettingsHeader } from '@/components/features/settings/header';
import { AccountSettings } from '@/components/features/settings/settings';
import { RoutePath, isValidAccountSettingsContent } from '@/libs/constants';
import { Navigate, useParams } from 'react-router-dom';

function AccountSettingsContentPage() {
  const { settings } = useParams();

  if (!isValidAccountSettingsContent(settings)) {
    return <Navigate to={RoutePath.FALLBACK_ACCOUNT_SETTINGS} />;
  }

  return (
    <PageLayout>
      <DashboardNavBar />
      <div className="min-h-screen bg-accent/30">
        <AccountSettingsHeader />
        <AccountSettings />
      </div>
    </PageLayout>
  );
}

export default withAuth(AccountSettingsContentPage);

import { PageLayout } from '@/components/common/page-layout';
import { withAuth } from '@/components/common/route/private-route';
import { DashboardNavBar } from '@/components/features/dashboard/dashboard-navbar';
import { WorkspaceSettingsHeader } from '@/components/features/workspace/dashboard/content/settings/header';
import { WorkspaceSettings } from '@/components/features/workspace/dashboard/content/settings/settings';
import { isValidWorkspaceSettingsContent, RoutePath } from '@/libs/constants';
import { Navigate, useParams } from 'react-router-dom';

function WorkspaceSettingsPage() {
  const { workspaceId, settings } = useParams();

  if (!isValidWorkspaceSettingsContent(settings)) {
    return <Navigate to={RoutePath.FALLBACK_WORKSPACE_SETTINGS(Number(workspaceId))} />;
  }

  return (
    <PageLayout>
      <DashboardNavBar />
      <div className="min-h-screen bg-accent/30">
        <WorkspaceSettingsHeader />
        <WorkspaceSettings />
      </div>
    </PageLayout>
  );
}

export default withAuth(WorkspaceSettingsPage);

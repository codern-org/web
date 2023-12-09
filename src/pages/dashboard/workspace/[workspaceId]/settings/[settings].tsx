import { PageLayout } from '@/components/common/page-layout';
import { withAuth } from '@/components/common/route/private-route';
import { DashboardNavBar } from '@/components/features/dashboard/dashboard-navbar';
import { WorkspaceSettingsHeader } from '@/components/features/workspace/content/settings/header';
import { WorkspaceSettings } from '@/components/features/workspace/content/settings/settings';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { isValidWorkspaceSettingsContent, RoutePath } from '@/libs/constants';
import { Navigate } from 'react-router-dom';

function WorkspaceSettingsPage() {
  const { workspaceId, settings } = useWorkspaceParams();

  if (!isValidWorkspaceSettingsContent(settings)) {
    return <Navigate to={RoutePath.FALLBACK_WORKSPACE_SETTINGS(workspaceId)} />;
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

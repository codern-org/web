import { PageLayout } from '@/components/common/page-layout';
import { withAuth } from '@/components/common/route/private-route';
import { DashboardNavBar } from '@/components/features/dashboard/dashboard-navbar';
import { WorkspaceContent } from '@/components/features/workspace/content';
import { WorkspaceHeader } from '@/components/features/workspace/header';
import {
  RoutePath,
  WorkspaceContent as WorkspaceContentEnum,
  isValidWorkspaceContent,
} from '@/libs/constants';
import { Navigate, useParams } from 'react-router-dom';

function WorkspaceContentPage() {
  const { workspaceId, content } = useParams();

  if (!isValidWorkspaceContent(content)) {
    return <Navigate to={RoutePath.FALLBACK_WORKSPACE(Number(workspaceId))} />;
  }

  if (content === WorkspaceContentEnum.SETTINGS) {
    return <Navigate to={RoutePath.FALLBACK_WORKSPACE_SETTINGS(Number(workspaceId))} />;
  }

  return (
    <PageLayout>
      <DashboardNavBar />
      <div className="min-h-screen bg-accent/30">
        <WorkspaceHeader />
        <WorkspaceContent />
      </div>
    </PageLayout>
  );
}

export default withAuth(WorkspaceContentPage);

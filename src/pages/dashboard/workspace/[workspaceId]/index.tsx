import { withAuth } from '@/components/common/route/private-route';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { RoutePath } from '@/libs/constants';
import { Navigate } from 'react-router-dom';

function IndividualWorkspacePage() {
  const { workspaceId } = useWorkspaceParams();
  return <Navigate to={RoutePath.FALLBACK_WORKSPACE(workspaceId)} />;
}

export default withAuth(IndividualWorkspacePage);

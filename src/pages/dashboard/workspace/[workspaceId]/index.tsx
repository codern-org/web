import { withAuth } from '@/components/common/route/private-route';
import { RoutePath, WorkspaceContent } from '@/libs/constants';
import { Navigate, useParams } from 'react-router-dom';

function IndividualWorkspacePage() {
  const { workspaceId } = useParams();
  return <Navigate to={RoutePath.WORKSPACE(Number(workspaceId), WorkspaceContent.ASSIGNMENT)} />;
}

export default withAuth(IndividualWorkspacePage);

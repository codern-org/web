import { withAuth } from '@/components/common/route/private-route';
import { RoutePath } from '@/libs/constants';
import { Navigate, useParams } from 'react-router-dom';

function IndividualWorkspacePage() {
  const { workspaceId } = useParams();
  return <Navigate to={RoutePath.FALLBACK_WORKSPACE(Number(workspaceId))} />;
}

export default withAuth(IndividualWorkspacePage);

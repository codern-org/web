import { withAuth } from '@/components/common/route/private-route';
import { RoutePath } from '@/libs/constants';
import { Navigate } from 'react-router-dom';

function WorkspacePage() {
  return <Navigate to={RoutePath.DASHBOARD} />;
}

export default withAuth(WorkspacePage);

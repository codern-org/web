import { withAuth } from '@/components/common/route/private-route';
import { RoutePath } from '@/libs/constants';
import { Navigate } from 'react-router-dom';

function AccountSettingsPage() {
  return <Navigate to={RoutePath.FALLBACK_ACCOUNT_SETTINGS} />;
}

export default withAuth(AccountSettingsPage);

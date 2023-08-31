import { PrivateRoute } from '@/components/common/private-route';
import { RoutePath } from '@/libs/constants';
import { DashboardPage } from '@/pages/dashboard-page';
import { NotFoundPage } from '@/pages/error/not-found-page';
import { HomePage } from '@/pages/home-page';
import { SignInPage } from '@/pages/sign-in-page';
import { WorkspaceDashboardPage } from '@/pages/workspace-dashboard-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes. Authentication is not required */}
        <Route
          path={RoutePath.HONE}
          element={<HomePage />}
        />
        <Route
          path={RoutePath.SIGNIN}
          element={<SignInPage />}
        />

        {/* Private routes. Authentication is required */}
        <Route
          path={RoutePath.DASHBOARD}
          element={<PrivateRoute element={<DashboardPage />} />}
        />
        <Route
          path={RoutePath.WORKSPACE_DASHBOARD}
          element={<PrivateRoute element={<WorkspaceDashboardPage />} />}
        />

        {/* Fallback routes */}
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

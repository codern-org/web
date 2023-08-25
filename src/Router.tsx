import { PrivateRoute } from '@/components/common/PrivateRoute';
import { RoutePath } from '@/libs/Constants';
import { DashboardPage } from '@/pages/DashboardPage';
import { HomePage } from '@/pages/HomePage';
import { SignInPage } from '@/pages/SignInPage';
import { WorkspaceDashboardPage } from '@/pages/WorkspaceDashboardPage';
import { NotFoundPage } from '@/pages/error/NotFoundPage';
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

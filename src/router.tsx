import { PrivateRoute } from '@/components/common/private-route';
import { OrganizerWorkspaceTab, RoutePath } from '@/libs/constants';
import { AssignmentPage } from '@/pages/assignment-page';
import { GoogleAuthCallback } from '@/pages/callback/google-auth';
import { DashboardPage } from '@/pages/dashboard-page';
import { NotFoundPage } from '@/pages/error/not-found-page';
import { HomePage } from '@/pages/home-page';
import { OrganizerDashboardPage } from '@/pages/organizer/dashboard-page';
import { OrganizerWorkspacePage } from '@/pages/organizer/workspace-page';
import { SignInPage } from '@/pages/sign-in-page';
import { WorkspacePage } from '@/pages/workspace-page';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Callbacks */}
        <Route
          path={RoutePath.GOOGLE_AUTH_CALLBACK}
          element={<GoogleAuthCallback />}
        />

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
          path={RoutePath.WORKSPACE}
          element={<PrivateRoute element={<WorkspacePage />} />}
        />
        <Route
          path={RoutePath.ASSIGNMENT}
          element={<PrivateRoute element={<AssignmentPage />} />}
        />

        <Route
          path={RoutePath.ORGANIZER_DASHBOARD}
          element={<PrivateRoute element={<OrganizerDashboardPage />} />}
        />

        {/* Organzier routes */}
        <Route
          path={RoutePath.ORGANIZER_WORKSPACE}
          element={<PrivateRoute element={<Navigate to={OrganizerWorkspaceTab.ASSIGNMENT} />} />}
        />

        <Route
          path={RoutePath.ORGANIZER_WORKSPACE}
          element={<PrivateRoute element={<OrganizerWorkspacePage />} />}
        >
          <Route
            path=":content"
            element={<PrivateRoute element={<OrganizerWorkspacePage />} />}
          />
          <Route
            path="settings/:settings"
            element={<PrivateRoute element={<OrganizerWorkspacePage />} />}
          />
        </Route>

        {/* Fallback routes */}
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

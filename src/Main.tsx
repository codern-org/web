import '@/assets/css/global.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { PrivateRoute } from '@/components/common/PrivateRoute';
import { Toaster } from '@/components/common/Toaster';
import { RoutePath } from '@/libs/Constants';
import { DashboardPage } from '@/pages/DashboardPage';
import { HomePage } from '@/pages/HomePage';
import { SignInPage } from '@/pages/SignInPage';
import { NotFoundPage } from '@/pages/error/NotFoundPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Router */}
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

          {/* Fallback routes */}
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>

      {/* Addons */}
      <Toaster />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

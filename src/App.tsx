import '@/assets/css/global.css';
import { Toaster } from '@/components/common/Toaster';

import { DashboardPage } from '@/pages/DashboardPage';
import { SignInPage } from '@/pages/SignInPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
]);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
};

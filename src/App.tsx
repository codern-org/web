import '@/assets/css/global.css';

import { HomePage } from '@/pages/HomePage';
import { SignInPage } from '@/pages/SignInPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/signin',
    element: <SignInPage />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

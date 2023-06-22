import '@/assets/css/global.css';

import { HomePage } from '@/pages/HomePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

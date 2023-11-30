import { Fragment } from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';

const pages = import.meta.glob('@/pages/**/*.tsx', { eager: true });
const preservedPages = import.meta.glob('@/pages/404.tsx', { eager: true });

const routes = Object.keys(pages).map((page) => {
  const path = page
    .replace(/\/src\/pages|index|\.tsx$/g, '') // Get route name
    .replace(/\[\.{3}\w+\]/g, '*') // Replace [...param] with *
    .replace(/\[([^\]]+)\]/g, ':$1'); // Replace [param] with :param

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return { path, element: pages[page].default };
});

const preservedRoutes = Object.keys(preservedPages).reduce((preserved, file) => {
  const key = file.replace(/\/src\/pages\/|\.tsx$/g, '');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return { ...preserved, [key]: preservedPages[file].default };
}, {});

export function Routes() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const NotFoundPage = preservedRoutes?.['404'] || Fragment;

  return (
    <RouterRoutes>
      {routes.map(({ path, element: Element = Fragment }) => (
        <Route
          key={path}
          path={path}
          element={<Element />}
        />
      ))}
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </RouterRoutes>
  );
}

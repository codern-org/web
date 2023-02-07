import '@/assets/css/main.css';

import { HomePage } from '@/pages/HomePage';
import Router, { Route } from "preact-router";

export const App = () => {
  return (
    <Router>
      <Route
        path="/"
        component={HomePage}
      />
    </Router>
  );
};

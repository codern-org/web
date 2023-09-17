import '@/assets/css/global.css';

import { Toaster } from '@/components/common/toaster';
import { ThemeProvider } from '@/hooks/theme-hook';
import { Router } from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Toaster />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

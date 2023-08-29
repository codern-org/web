import '@/assets/css/global.css';

import { Router } from '@/Router';
import { Toaster } from '@/components/common/Toaster';
import { ThemeProvider } from '@/hooks/ThemeHook';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

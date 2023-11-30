import '@/assets/css/global.css';

import { ErrorBoundary } from '@/components/common/error/error-boundary';
import { FallbackError } from '@/components/common/error/fallback';
import { Toaster } from '@/components/common/toaster';
import { ThemeProvider } from '@/hooks/theme-hook';
import { WebSocketProvider } from '@/hooks/websocket-hook';
import { Routes } from '@/libs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <ThemeProvider>
          <Toaster />
          <BrowserRouter>
            <ErrorBoundary fallbackComponent={FallbackError}>
              <Routes />
            </ErrorBoundary>
          </BrowserRouter>
        </ThemeProvider>
      </WebSocketProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

import '@/assets/css/global.css';

import { Toaster } from '@/components/common/toaster';
import { ThemeProvider } from '@/hooks/theme-hook';
import { WebSocketProvider } from '@/hooks/websocket-hook';
import { Routes } from '@/libs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <ThemeProvider>
          <Toaster />
          <Routes />
        </ThemeProvider>
      </WebSocketProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

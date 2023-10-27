/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useCallback, useContext, useEffect, useRef } from 'react';

type WebSocketPayload = {
  channel: string;
  message: any;
};

type WebSocketChannelHandler = (message: any) => void;

type WebSocketProviderProps = {
  children: ReactNode;
};

type WebSocketProviderState = {
  onSocket: (channel: string, cb: WebSocketChannelHandler) => void;
};

const WebSocketProviderContext = createContext<WebSocketProviderState>(
  {} as WebSocketProviderState,
);

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const ws = useRef<WebSocket>();
  const channelHandlers = useRef<Map<string, WebSocketChannelHandler[]>>(new Map());

  const connect = useCallback(() => {
    const url = new URL(window.APP_CONFIG.BACKEND_URL);
    url.protocol = 'ws:';
    url.pathname = 'ws';

    ws.current = new WebSocket(url);

    ws.current.addEventListener('open', () => {
      console.log(
        '%c🤖 Dimension portal is opening...',
        'background-color: black; color: white; font-size: 0.75rem; padding: 0.25rem; border-radius: 0.25rem',
      );
    });

    ws.current.addEventListener('close', () => {
      console.log(
        '%c🤖 Dimension portal is terminated...',
        'background-color: red; color: white; font-size: 0.75rem; padding: 0.25rem; border-radius: 0.25rem',
      );

      setTimeout(() => {
        console.log(
          '%c🤖 Dimension portal is reopening...',
          'background-color: red; color: white; font-size: 0.75rem; padding: 0.25rem; border-radius: 0.25rem',
        );
        connect();
      }, 1000);
    });

    ws.current.addEventListener('message', (event) => {
      const payload = JSON.parse(event.data) as WebSocketPayload;
      if (payload.channel && payload.message) {
        const handlers = channelHandlers.current.get(payload.channel);
        if (!handlers) return;
        handlers.forEach((handler) => handler(payload.message));
      }
    });
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (ws.current) ws.current.close();
    };
  }, [connect]);

  const onSocket = (channel: string, cb: WebSocketChannelHandler) => {
    const handlers = channelHandlers.current.get(channel);
    if (handlers) {
      channelHandlers.current.set(channel, [...handlers, cb]);
    } else {
      channelHandlers.current.set(channel, [cb]);
    }
  };

  const value = {
    onSocket: onSocket,
  };

  return (
    <WebSocketProviderContext.Provider value={value}>{children}</WebSocketProviderContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketProviderContext);
  if (!context) throw new Error('useWebSocket must be used within a WebSocketProvider');
  return context;
};

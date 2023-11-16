/* eslint-disable @typescript-eslint/no-explicit-any */
import { WsErrorReason } from '@/types/api-response-type';
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
  subscribe: (channel: string, cb: WebSocketChannelHandler) => void;
  unsubscribe: (channel: string, cb: WebSocketChannelHandler) => void;
};

const WebSocketProviderContext = createContext<WebSocketProviderState>(
  {} as WebSocketProviderState,
);

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const ws = useRef<WebSocket>();
  const channelHandlers = useRef<Map<string, WebSocketChannelHandler[]>>(new Map());

  const connect = useCallback(() => {
    ws.current = new WebSocket(window.APP_CONFIG.WS_URL);

    ws.current.addEventListener('open', () => {
      console.log(
        '%c🤖 Dimension portal is opening...',
        'background-color: black; color: white; font-size: 0.7rem; padding: 0.125rem; border-radius: 0.25rem',
      );
    });

    ws.current.addEventListener('close', (event) => {
      try {
        const reason: WsErrorReason = JSON.parse(event.reason);
        if (reason.error.code) return;
      } catch {
        /* empty */
      }

      console.log(
        '%c🤖 Dimension portal is terminated...',
        'background-color: red; color: white; font-size: 0.7rem; padding: 0.125rem; border-radius: 0.25rem',
      );

      setTimeout(() => {
        console.log(
          '%c🤖 Dimension portal is reopening...',
          'background-color: red; color: white; font-size: 0.7rem; padding: 0.125rem; border-radius: 0.25rem',
        );
        if (ws.current?.readyState === WebSocket.CLOSED) connect();
      }, 3000);
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

  const subscribe = (channel: string, cb: WebSocketChannelHandler) => {
    const handlers = channelHandlers.current.get(channel);
    if (handlers) {
      channelHandlers.current.set(channel, [...handlers, cb]);
    } else {
      channelHandlers.current.set(channel, [cb]);
    }
  };

  const unsubscribe = (channel: string, cb: WebSocketChannelHandler) => {
    const handlers = channelHandlers.current.get(channel);
    if (!handlers) return;
    const index = handlers.findIndex((handler) => handler === cb);
    if (index === -1) return;
    handlers.splice(index, 1);
  };

  const value = {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
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

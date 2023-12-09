/* eslint-disable @typescript-eslint/no-explicit-any */
import { deserializeDate } from '@/libs/utils';
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
  connect: () => void;
  disconnect: () => void;
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
      console.log(
        '%c🤖 Dimension portal is terminated...',
        'background-color: red; color: white; font-size: 0.7rem; padding: 0.125rem; border-radius: 0.25rem',
      );

      try {
        // Close by server, unauthorized
        const reason: WsErrorReason = JSON.parse(event.reason);
        if (reason.error.code) return;
      } catch {
        // Use code 1000 to check reason later for manually closing.
        // Use code 4000 as unmounting notice.
        // And 1006 seems occur in react strict mode after first rendering
        if ([1000, 1006, 4000].includes(event.code)) {
          return;
        }
      }

      setTimeout(() => {
        // Avoid race condition
        if (ws.current?.readyState === WebSocket.CLOSED) {
          console.log(
            '%c🤖 Dimension portal is reopening...',
            'background-color: orange; color: white; font-size: 0.7rem; padding: 0.125rem; border-radius: 0.25rem',
          );
          connect();
        }
      }, 3000);
    });

    ws.current.addEventListener('message', (event) => {
      const payload = JSON.parse(event.data) as WebSocketPayload;
      if (payload.channel && payload.message) {
        deserializeDate(payload.message);
        const handlers = channelHandlers.current.get(payload.channel);
        if (!handlers) return;
        handlers.forEach((handler) => handler(payload.message));
      }
    });
  }, []);

  const disconnect = useCallback((code = 1000) => {
    ws.current?.close(code);
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect(4000);
  }, [connect, disconnect]);

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
    connect,
    disconnect,
    subscribe,
    unsubscribe,
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

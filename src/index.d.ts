export {};

declare global {
  interface Window {
    APP_CONFIG: {
      BACKEND_URL: string;
      WS_URL: string;
    };
  }
}

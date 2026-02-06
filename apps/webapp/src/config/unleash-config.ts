const VITE_UNLEASH_API_URL: string = import.meta.env
  .VITE_UNLEASH_API_URL as string;
const VITE_UNLEASH_API_CLIENT_KEY: string = import.meta.env
  .VITE_UNLEASH_API_CLIENT_KEY as string;

export const config = {
  url: VITE_UNLEASH_API_URL,
  clientKey: VITE_UNLEASH_API_CLIENT_KEY,
  appName: 'rhino-web-application',
};

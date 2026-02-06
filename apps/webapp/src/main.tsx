import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { FlagProvider } from '@unleash/proxy-client-react';
import './i18n/index.ts';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { theme } from './config/mantain-config.ts';
import { config } from './config/unleash-config.ts';
import { FavoriteMeterProvider } from './context/favoriteMeter/favorite-meter-provider.tsx';
import { UserProvider } from './context/user/user-provider.tsx';
import { UserFilterProvider } from './context/userFilter/user-filter-provider.tsx';
import MainRoute from './routes/index.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <UserFilterProvider>
          <FavoriteMeterProvider>
            <MantineProvider theme={theme}>
              <ModalsProvider>
                <FlagProvider config={config}>
                  <MainRoute />
                </FlagProvider>
              </ModalsProvider>
            </MantineProvider>
          </FavoriteMeterProvider>
        </UserFilterProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);

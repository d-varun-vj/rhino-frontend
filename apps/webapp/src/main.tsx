import './index.css';
import './i18n/index.ts';
import '@mantine/core/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { FavoriteMeterProvider } from './context/favoriteMeter/favorite-meter-provider.tsx';
import MainRoute from './routes/index.tsx';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { StrictMode } from 'react';
import { UserFilterProvider } from './context/userFilter/user-filter-provider.tsx';
import { UserProvider } from './context/user/user-provider.tsx';
import { createRoot } from 'react-dom/client';
import { theme } from './config/mantain-config.ts';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <UserFilterProvider>
          <FavoriteMeterProvider>
            <MantineProvider theme={theme}>
              <ModalsProvider>
                <MainRoute />
              </ModalsProvider>
            </MantineProvider>
          </FavoriteMeterProvider>
        </UserFilterProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);

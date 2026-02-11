import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './i18n/index.ts';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { theme } from './config/mantain-config.ts';
import { FavoriteMeterProvider } from './context/favoriteMeter/favorite-meter-provider.tsx';
import { FeatureFlagProvider } from './context/featureFlag/feature-flag-provider.tsx';
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
            <FeatureFlagProvider>
              <MantineProvider theme={theme}>
                <ModalsProvider>
                  <MainRoute />
                </ModalsProvider>
              </MantineProvider>
            </FeatureFlagProvider>
          </FavoriteMeterProvider>
        </UserFilterProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);

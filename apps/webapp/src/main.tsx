import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n/index.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainRoute from './routes/index.tsx';

import { FavoriteMeterProvider } from './context/favoriteMeter/favorite-meter-provider.tsx';
import { UserFilterProvider } from './context/userFilter/user-filter-provider.tsx';
import { UserProvider } from './context/user/user-provider.tsx';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <UserFilterProvider>
          <FavoriteMeterProvider>
            <MainRoute />
          </FavoriteMeterProvider>
        </UserFilterProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);

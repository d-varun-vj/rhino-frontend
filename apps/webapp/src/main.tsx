import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n/index.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainRoute from './pages/index.tsx';

import { FavoriteMeterProvider } from './context/favoriteMeter/FavoriteMeterProvider.tsx';
import { UserFilterProvider } from './context/userFilter/UserFilterProvider.tsx';
import { UserProvider } from './context/user/UserProvider.tsx';

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

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n/index.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainRoute from './appRouter/index.tsx';
import { UserProvider } from './context/useUser/index.tsx';
import { FavoriteMeterProvider } from './context/useFavoriteMeter/index.tsx';
import { FilterProvider } from './context/useFilter/index.tsx';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <FilterProvider>
          <FavoriteMeterProvider>
            <MainRoute />
          </FavoriteMeterProvider>
        </FilterProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n/index.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FilterProvider } from './context/useFilter/index.tsx';
import MainRoute from './appRouter/index.tsx';
import { TokenProvider } from './context/useToken/index.tsx';
import { UserProvider } from './context/useUser/index.tsx';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TokenProvider>
        <FilterProvider>
          <UserProvider>
            <MainRoute />
          </UserProvider>
        </FilterProvider>
      </TokenProvider>
    </QueryClientProvider>
  </StrictMode>
);

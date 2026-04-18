import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { queryClient } from './lib/queryClient';
import { routeTree } from './routeTree.gen';
import { initMockServer } from './server';

import './styles/tailwind.css';
import './styles/index.sass';

initMockServer();

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element #root not found.');
}

ReactDOM.createRoot(container).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);

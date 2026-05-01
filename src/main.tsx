import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/styles/index.css';
import App from './App.tsx';
import { BagContextProvider } from './contexts/BagContext/BagContextProvider.tsx';
import { Toaster } from 'sonner';
import { OrderContextProvider } from './contexts/OrderContext/OrderContexteProvider.tsx';
import { AuthProvider } from './contexts/AuthContext/AuthProvider.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BagContextProvider>
        <OrderContextProvider>
          <Toaster position="top-center" richColors />
          <App />
        </OrderContextProvider>
      </BagContextProvider>
    </AuthProvider>
  </StrictMode>,
);

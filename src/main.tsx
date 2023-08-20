import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import App from './app/app';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://sjnxrpazstalmggosrcy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbnhycGF6c3RhbG1nZ29zcmN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIxMjIyNjcsImV4cCI6MjAwNzY5ODI2N30.oL_LjLWYH_V0HjxPCwjPt1NXaosiXKQbCDugQDELOP8'
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      {/* Provides the database connection to the application */}
    <App />
    </SessionContextProvider>
  </StrictMode>
);

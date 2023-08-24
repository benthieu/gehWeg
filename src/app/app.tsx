// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';
import { Outlet } from 'react-router-dom';
import NavBar from './nav-bar/nav-bar';
import { StateProvider } from './state/state.context';
import { Database } from './state/supabase/supabase';

export function App() {
  const supabaseClient = createClient<Database>(
    'https://sjnxrpazstalmggosrcy.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbnhycGF6c3RhbG1nZ29zcmN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIxMjIyNjcsImV4cCI6MjAwNzY5ODI2N30.oL_LjLWYH_V0HjxPCwjPt1NXaosiXKQbCDugQDELOP8'
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <StateProvider>
        <div className="main-content">
          <Outlet></Outlet>
        </div>
        <div className="nav-bar">
          <NavBar></NavBar>
        </div>
      </StateProvider>
    </SessionContextProvider>
  );
}

export default App;

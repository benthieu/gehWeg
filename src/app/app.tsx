// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';
import { Outlet } from 'react-router-dom';
import AlertSnackbar from './alert/alert-snackbar';
import NavBar from './nav-bar/nav-bar';
import { StateProvider } from './state/state.context';
import { Database } from './state/supabase/supabase';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export function App() {
  const supabaseClient = createClient<Database>(
    'https://sjnxrpazstalmggosrcy.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbnhycGF6c3RhbG1nZ29zcmN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIxMjIyNjcsImV4cCI6MjAwNzY5ODI2N30.oL_LjLWYH_V0HjxPCwjPt1NXaosiXKQbCDugQDELOP8'
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <StateProvider>
          <div className="main-content">
            <Outlet></Outlet>
          </div>
          <div className="nav-bar">
            <NavBar></NavBar>
          </div>
          <AlertSnackbar></AlertSnackbar>
        </StateProvider>
      </SessionContextProvider>
    </LocalizationProvider>
  );
}

export default App;

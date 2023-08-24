// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';
import OverviewMap from './overview-map/overview-map';
import { StateProvider } from './state/state.context';
import { Database } from './state/supabase/supabase';
import UserList from './user-list/user-list';

export function App() {
  const supabaseClient = createClient<Database>(
    'https://sjnxrpazstalmggosrcy.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbnhycGF6c3RhbG1nZ29zcmN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIxMjIyNjcsImV4cCI6MjAwNzY5ODI2N30.oL_LjLWYH_V0HjxPCwjPt1NXaosiXKQbCDugQDELOP8'
  );
  console.log('initialize supbase');

  return (
    <div>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <StateProvider>
          <OverviewMap></OverviewMap>
          <UserList></UserList>
        </StateProvider>
      </SessionContextProvider>
    </div>
  );
}

export default App;

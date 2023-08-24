import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createContext, useEffect, useState } from 'react';
import { Tables } from './supabase/database.types';

interface State {
  users: Tables<'User'>[];
  offers: Tables<'Offer'>[];
}

const StateContext = createContext<State>({
  users: [],
  offers: [],
});

interface StateProviderProperties {
  children: React.ReactNode;
}
export const StateProvider = ({ children }: StateProviderProperties) => {
  const [users, setUsers] = useState<Tables<'User'>[]>([]);
  const [offers, setOffers] = useState<Tables<'Offer'>[]>([]);
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    const getUsers = async () => {
      const query = supabaseClient.from('User').select('*');
      const result = await query;
      if (result.data) {
        setUsers(result.data);
      }
    };
    const getOffers = async () => {
      const query = supabaseClient.from('Offer').select('*');
      const result = await query;
      if (result.data) {
        setOffers(result.data);
      }
    };
    getOffers();
    getUsers();
  }, []);

  return (
    <StateContext.Provider value={{ users, offers }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;

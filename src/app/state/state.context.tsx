import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createContext, useEffect, useState } from 'react';
import { Tables } from './supabase/database.types';

interface State {
  users: Tables<'User'>[];
  offers: Tables<'Offer'>[];
  activeUser: Tables<'User'> | null;
  setUserActive: (id: number) => void
}

const StateContext = createContext<State>({
  users: [],
  offers: [],
  activeUser: null,
  setUserActive: () => {}
});

interface StateProviderProperties {
  children: React.ReactNode;
}
export const StateProvider = ({ children }: StateProviderProperties) => {
  const [users, setUsers] = useState<Tables<'User'>[]>([]);
  const [offers, setOffers] = useState<Tables<'Offer'>[]>([]);
  const [activeUser, setActiveUser] = useState<Tables<'User'> | null>(null);
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    const getUsers = async () => {
      const query = supabaseClient.from('User').select('*');
      const result = await query;
      if (result.data) {
        setUsers(result.data);
        setActiveUser(result.data[0]);
      }
    };
    const getOffers = async () => {
      const query = supabaseClient.from('offer_json').select('*');
      const result = await query;
      if (result.data) {
        setOffers(result.data);
      }
    };
    getOffers();
    getUsers();
  }, []);

  function setUserActive(id: number): void {
    const foundUser = users.find((user) => user.id === id);
    if (foundUser) {
      setActiveUser(foundUser);
    }
  }

  return (
    <StateContext.Provider value={{ users, offers, activeUser, setUserActive }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createContext, useEffect, useState } from 'react';
import {
  Functions,
  Offer,
  OffersInViewArgs,
  Tables,
  Views,
} from './supabase/database.types';

interface State {
  users: Tables<'User'>[];
  offers: Offer[];
  categories: Tables<'Category'>[];
  activeUser: Tables<'User'> | null;
  setUserActive: (id: number) => void;
  loadListOffers: () => void;
  loadMapOffers: (bounds: OffersInViewArgs) => void;
}

const StateContext = createContext<State>({
  users: [],
  offers: [],
  categories: [],
  activeUser: null,
  setUserActive: () => {},
  loadListOffers: () => {},
  loadMapOffers: () => {},
});

function mapOffer(offer_json: Views<'offer_json'>): Offer {
  let location = null;
  if (offer_json.location) {
    const location_json = JSON.parse(offer_json.location);
    location = {
      lat: location_json.coordinates[0],
      lng: location_json.coordinates[1],
    };
  }
  return { ...offer_json, location };
}

interface StateProviderProperties {
  children: React.ReactNode;
}
export const StateProvider = ({ children }: StateProviderProperties) => {
  const [users, setUsers] = useState<Tables<'User'>[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [categories, setCategories] = useState<Tables<'Category'>[]>([{name: 'none'}])
  const [activeUser, setActiveUser] = useState<Tables<'User'> | null>(null);
  const supabaseClient = useSupabaseClient();

  async function getUsers() {
    const query = supabaseClient.from('User').select('*');
    const result = await query;
    if (result.data) {
      setUsers(result.data);
      setActiveUser(result.data[0]);
    }
  }

  async function loadListOffers() {
    const query = supabaseClient
      .from('offer_json')
      .select('*')
      .order('created_at', { ascending: false });
    const result = await query;
    if (result.data) {
      setOffers(result.data.map((offer) => mapOffer(offer)));
    }
  }

  async function loadFilterListOffers(category: string | null, subject: string | null) {
    const query = supabaseClient
      .from( 'offer_json' )
      .select( '*' )
      .eq( 'category', category ? category : '%' )
      .ilike( 'subject', subject ? '%' + subject + '%' : '%' )
      .eq( 'status', 'new' )
      .order( 'created_at', { ascending: false });
    const result = await query;
    if (result.data) {
      setOffers(result.data.map((offer) => mapOffer(offer)));
    }
  }

  async function getCategories() {
    const query = supabaseClient.from('Category').select('*');
    const result = await query;
    if (result.data) {
      setCategories(result.data);
    }
  };

  useEffect(() => {
    getUsers();
    getCategories();
  }, []);

  function setUserActive(id: number): void {
    const foundUser = users.find((user) => user.id === id);
    if (foundUser) {
      setActiveUser(foundUser);
    }
  }

  async function loadMapOffers(bounds: OffersInViewArgs) {
    const { data } = await supabaseClient.rpc('offers_in_view', bounds);
    const result: Functions<'offers_in_view'>['Returns'] = data;
    setOffers(result.map((offer) => mapOffer(offer)));
  }

  return (
    <StateContext.Provider
      value={{
        users,
        offers,
        categories,
        activeUser,
        setUserActive,
        loadMapOffers,
        loadListOffers,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;

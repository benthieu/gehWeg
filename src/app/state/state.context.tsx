import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { LatLngLiteral } from 'leaflet';
import { createContext, useEffect, useState } from 'react';
import { Alert } from '../alert/alert.model';
import { FilterProps } from '../offer-list-filter/list-filter';
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
  defaultLocation: LatLngLiteral;
  currentLocation: LatLngLiteral | undefined;
  alert: Alert | null;
  setUserActive: (id: number) => void;
  loadListOffers: () => void;
  loadMapOffers: (bounds: OffersInViewArgs) => void;
  loadFilterListOffers: (filter: FilterProps) => void;
  setAlert: (alert: Alert | null) => void;
}

const StateContext = createContext<State>({
  users: [],
  offers: [],
  categories: [],
  activeUser: null,
  defaultLocation: { lat: 0, lng: 0 },
  currentLocation: undefined,
  alert: null,
  setUserActive: () => undefined,
  loadListOffers: () => undefined,
  loadMapOffers: () => undefined,
  loadFilterListOffers: () => undefined,
  setAlert: () => undefined,
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
  const [alert, setAlert] = useState<Alert | null>(null);
  const [categories, setCategories] = useState<Tables<'Category'>[]>([]);
  const [activeUser, setActiveUser] = useState<Tables<'User'> | null>(null);
  const supabaseClient = useSupabaseClient();
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral>();
  const [defaultLocation] = useState<LatLngLiteral>({
    lat: 46.947707374681514,
    lng: 7.445807175401288,
  });

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

  async function loadFilterListOffers(filter: FilterProps) {
    const query = supabaseClient
      .from('offer_json')
      .select('*')
      .order('created_at', { ascending: false });
    if (filter.category && filter.category !== 0) {
      query.eq('category', filter.category);
    }
    if (filter.title) {
      query.ilike('subject', '%' + filter.title + '%');
    }
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
  }

  const getCurrentLocation = () => {
    if (!currentLocation) {
      navigator.geolocation.getCurrentPosition(
        (e) => {
          const currentLocation = {
            lat: e.coords.latitude,
            lng: e.coords.longitude,
          };
          setCurrentLocation(currentLocation);
        },
        () => {
          console.log('error getting geolocation: ');
          setCurrentLocation(defaultLocation);
        }
      );
    }
  };

  useEffect(() => {
    getUsers();
    getCategories();
    getCurrentLocation();
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
        currentLocation,
        defaultLocation,
        loadFilterListOffers,
        alert,
        setAlert,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;

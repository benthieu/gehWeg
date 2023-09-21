import {useSupabaseClient} from '@supabase/auth-helpers-react';
import {createContext, useEffect, useState} from 'react';
import {LatLngLiteral} from 'leaflet';
import {Functions, Offer, OffersInViewArgs, Tables, Views,} from './supabase/database.types';
import {FilterProps} from "../offer-list-filter/list-filter";

interface State {
  users: Tables<'User'>[];
  offers: Offer[];
  categories: Tables<'Category'>[];
  activeUser: Tables<'User'> | null;
  setUserActive: (id: number) => void;
  currentLocation: LatLngLiteral | undefined;
  defaultLocation: LatLngLiteral;
  loadListOffers: () => void;
  loadMapOffers: (bounds: OffersInViewArgs) => void;
  loadFilterListOffers: (filter: FilterProps) => void;
}

const StateContext = createContext<State>({
  users: [],
  offers: [],
  categories: [],
  activeUser: null,
  setUserActive: () => {},
  currentLocation: undefined,
  defaultLocation: { lat: 0, lng: 0 },
  loadListOffers: () => {},
  loadMapOffers: () => {},
  loadFilterListOffers: () => {},
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
  const [categories, setCategories] = useState<Tables<'Category'>[]>([
    { name: 'none' },
  ]);
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
      .from( 'offer_json' )
      .select( '*' )
      .like( 'category', filter.category ? filter.category : '%' )
      .ilike( 'subject', filter.title ? '%' + filter.title + '%' : '%' )
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;

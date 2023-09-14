import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createContext, useEffect, useState } from 'react';
import { Offer, Tables } from './supabase/database.types';
import { LatLngLiteral } from 'leaflet';

interface State {
  users: Tables<'User'>[];
  offers: Offer[];
  activeUser: Tables<'User'> | null;
  setUserActive: (id: number) => void;
  currentLocation: LatLngLiteral | undefined;
}

const StateContext = createContext<State>({
  users: [],
  offers: [],
  activeUser: null,
  setUserActive: () => {},
  currentLocation: undefined,
});

interface StateProviderProperties {
  children: React.ReactNode;
}
export const StateProvider = ({ children }: StateProviderProperties) => {
  const defaultLocation = { lat: 46.947707374681514, lng: 7.445807175401288 }; // Bern city
  const [users, setUsers] = useState<Tables<'User'>[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [activeUser, setActiveUser] = useState<Tables<'User'> | null>(null);
  const supabaseClient = useSupabaseClient();
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral>();

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
      const query = supabaseClient
        .from('offer_json')
        .select('*')
        .order('created_at', { ascending: false });
      const result = await query;
      if (result.data) {
        setOffers(
          result.data.map((offer) => {
            const location = JSON.parse(offer.location);
            if (location) {
              offer.location = {
                lat: location.coordinates[0],
                lng: location.coordinates[1],
              };
            }
            return offer;
          })
        );
      }
    };
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
    getCurrentLocation();
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
    <StateContext.Provider
      value={{ users, offers, activeUser, setUserActive, currentLocation}}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;

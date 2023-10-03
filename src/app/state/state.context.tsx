import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { LatLngLiteral } from 'leaflet';
import { createContext, useCallback, useEffect, useState } from 'react';
import { Alert } from '../alert/alert.model';
import { FilterProps } from '../offer/offer-list-filter/list-filter';
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
  latestOfferUpdate: string | null;
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
  latestOfferUpdate: null,
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
  const [alert, _setAlert] = useState<Alert | null>(null);
  const [latestOfferUpdate, setLatestOfferUpdate] = useState<string | null>(
    null
  );
  const [categories, setCategories] = useState<Tables<'Category'>[]>([]);
  const [activeUser, setActiveUser] = useState<Tables<'User'> | null>(null);
  const supabaseClient = useSupabaseClient();
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral>();
  const [defaultLocation] = useState<LatLngLiteral>({
    lat: 46.947707374681514,
    lng: 7.445807175401288,
  });

  // Do not load offers older than this timespan, at the moment 21 days
  const offerMaxAge = new Date(
    new Date().getTime() - 24 * 60 * 60 * 1000 * 21
  ).toUTCString();

  const getUsers = useCallback(() => {
    const query = supabaseClient.from('User').select('*');
    query.then((result) => {
      if (result.data) {
        setUsers(result.data);
        setActiveUser(result.data[0]);
      }
    });
  }, [supabaseClient]);

  const loadListOffers = useCallback(() => {
    const query = supabaseClient
      .from('offer_json')
      .select('*')
      .gt('created_at', offerMaxAge)
      .order('created_at', { ascending: false });

    query.then((result) => {
      if (result.data) {
        setOffers(result.data.map((offer) => mapOffer(offer)));
      }
    });
  }, [offerMaxAge, supabaseClient]);

  const loadFilterListOffers = useCallback(
    (filter: FilterProps) => {
      const query = supabaseClient
        .from('offer_json')
        .select('*')
        .gt('created_at', offerMaxAge)
        .order('created_at', { ascending: false });
      if (filter.category && filter.category !== 0) {
        query.eq('category', filter.category);
      }
      if (filter.title) {
        query.ilike('subject', '%' + filter.title + '%');
      }
      query.then((result) => {
        if (result.data) {
          setOffers(result.data.map((offer) => mapOffer(offer)));
        }
      });
    },
    [offerMaxAge, supabaseClient]
  );

  const getCategories = useCallback(() => {
    const query = supabaseClient.from('Category').select('*');
    query.then((result) => {
      if (result.data) {
        setCategories(result.data);
      }
    });
  }, [supabaseClient]);

  const getCurrentLocation = useCallback(() => {
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
          setCurrentLocation(defaultLocation);
        }
      );
    }
  }, [currentLocation, defaultLocation]);

  const subscribeToOfferChanges = useCallback((): RealtimeChannel => {
    return supabaseClient
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
        },
        (payload) => {
          setLatestOfferUpdate(payload.commit_timestamp);
        }
      )
      .subscribe();
  }, [supabaseClient]);

  const setUserActive = useCallback(
    (id: number): void => {
      const foundUser = users.find((user) => user.id === id);
      if (foundUser) {
        setActiveUser(foundUser);
      }
    },
    [users]
  );

  const loadMapOffers = useCallback(
    (bounds: OffersInViewArgs) => {
      supabaseClient
        .rpc('offers_in_view', bounds)
        .gt('created_at', offerMaxAge)
        .then((response) => {
          const result: Functions<'offers_in_view'>['Returns'] = response.data;
          setOffers(result.map((offer) => mapOffer(offer)));
        });
    },
    [offerMaxAge, supabaseClient]
  );

  const setAlert = useCallback((alert: Alert | null) => {
    _setAlert(alert);
  }, []);

  useEffect(() => {
    getUsers();
    getCategories();
    getCurrentLocation();
    const offerSubscription = subscribeToOfferChanges();
    return () => {
      offerSubscription.unsubscribe();
    };
  }, [getCategories, getCurrentLocation, getUsers, subscribeToOfferChanges]);

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
        latestOfferUpdate,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;

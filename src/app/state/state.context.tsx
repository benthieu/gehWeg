import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { LatLngLiteral } from 'leaflet';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';
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
  offerFilter: FilterProps;
  latestOfferUpdate: string | null;
  setUserActive: (id: number) => void;
  loadListOffers: () => void;
  loadMapOffers: (bounds: OffersInViewArgs) => void;
  setAlert: (alert: Alert | null) => void;
  setOfferFilter: (filter: FilterProps) => void;
}

const StateContext = createContext<State>({
  users: [],
  offers: [],
  categories: [],
  activeUser: null,
  defaultLocation: { lat: 0, lng: 0 },
  currentLocation: undefined,
  alert: null,
  offerFilter: {
    category: 0,
    title: '',
  },
  latestOfferUpdate: null,
  setUserActive: () => undefined,
  loadListOffers: () => undefined,
  loadMapOffers: () => undefined,
  setAlert: () => undefined,
  setOfferFilter: () => undefined,
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
  const [offerFilter, _setOfferFilter] = useState<FilterProps>({
    category: 0,
    title: '',
  });

  // Do not load offers older than this timespan, at the moment 21 days
  const offerMaxAge = useRef(new Date(
    new Date().getTime() - 24 * 60 * 60 * 1000 * 21
  ).toUTCString());

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
      .gt('created_at', offerMaxAge.current)
      .order('created_at', { ascending: false });
    if (offerFilter.category && offerFilter.category !== 0) {
      query.eq('category', offerFilter.category);
    }
    if (offerFilter.title) {
      query.ilike('subject', '%' + offerFilter.title + '%');
    }
    query.then((result) => {
      if (result.data) {
        setOffers(result.data.map((offer) => mapOffer(offer)));
      }
    });
  }, [offerFilter, supabaseClient]);

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
        .gt('created_at', offerMaxAge.current)
        .then((response) => {
          const result: Functions<'offers_in_view'>['Returns'] = response.data;
          setOffers(result.map((offer) => mapOffer(offer)));
        });
    },
    [supabaseClient]
  );

  const setAlert = useCallback((alert: Alert | null) => {
    _setAlert(alert);
  }, []);

  const setOfferFilter = useCallback(
    (filter: FilterProps) => {
      _setOfferFilter(filter);
      loadListOffers();
    },
    [loadListOffers]
  );

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
        alert,
        setAlert,
        latestOfferUpdate,
        offerFilter,
        setOfferFilter,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;

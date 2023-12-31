import { LatLngLiteral } from 'leaflet';
import { Database } from './supabase';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Views<T extends keyof Database['public']['Views']> =
  Database['public']['Views'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];
export type Functions<T extends keyof Database['public']['Functions']> =
  Database['public']['Functions'][T];

export type Offer = Omit<Views<'offer_json'>, 'location'> & {
  location: LatLngLiteral | null;
};

export type OffersInViewArgs = Functions<'offers_in_view'>['Args'];

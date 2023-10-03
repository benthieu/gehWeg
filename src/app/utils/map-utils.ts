import { LatLngBounds } from "leaflet";
import { Functions } from "../state/supabase/database.types";

export function mapOfferQueryBounds(
  bounds: LatLngBounds
): Functions<'offers_in_view'>['Args'] {
  return {
    min_lat: bounds.getWest(),
    max_lat: bounds.getEast(),
    min_long: bounds.getSouth(),
    max_long: bounds.getNorth(),
  };
}
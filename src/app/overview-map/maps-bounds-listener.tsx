import { LatLngBounds } from 'leaflet';
import { useRef } from 'react';
import { useMapEvents } from 'react-leaflet';
import { Functions, OffersInViewArgs } from '../state/supabase/database.types';

interface MapsBoundsListenerProperties {
  boundsChanged: (bounds:OffersInViewArgs) => void;
}

function mapOfferQueryBounds(
  bounds: LatLngBounds
): Functions<'offers_in_view'>['Args'] {
  return {
    min_lat: bounds.getWest(),
    max_lat: bounds.getEast(),
    min_long: bounds.getSouth(),
    max_long: bounds.getNorth(),
  };
}
export function MapsBoundsListener({
  boundsChanged,
}: MapsBoundsListenerProperties) {
  const latestBounds = useRef<LatLngBounds | null>(null);
  const map = useMapEvents({
    zoomend: () => handleChange(),
    moveend: () => handleChange(),
  });
  function handleChange() {
    const mapBounds = map.getBounds();
    if (latestBounds.current?.toBBoxString() !== mapBounds.toBBoxString()) {
      latestBounds.current = mapBounds;
      boundsChanged(mapOfferQueryBounds(mapBounds));
    }
  }
  handleChange();
  return <></>;
}

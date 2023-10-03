import { LatLngBounds } from 'leaflet';
import { useRef } from 'react';
import { useMapEvents } from 'react-leaflet';
import { OffersInViewArgs } from '../state/supabase/database.types';
import { mapOfferQueryBounds } from '../utils/map-utils';

interface MapsBoundsListenerProperties {
  boundsChanged: (bounds:OffersInViewArgs) => void;
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

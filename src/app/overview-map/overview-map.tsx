import { LatLngLiteral } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

export function OverviewMap() {
  const locationBern: LatLngLiteral = {
    lat: 46.947707374681514,
    lng: 7.445807175401288
  };
  return (
    <MapContainer
      center={locationBern}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}

export default OverviewMap;

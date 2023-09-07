import { LatLngLiteral } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { AddOfferForm } from '../add-offer-form/add-offer-form';

export function OverviewMap() {
  const navigate = useNavigate();

  const locationBern: LatLngLiteral = {
    lat: 46.947707374681514,
    lng: 7.445807175401288,
  };
  return (
    <MapContainer center={locationBern} zoom={13} scrollWheelZoom={false}>
      <header className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </header>
      <aside>
        <section>
          <Fab
            onClick={() => navigate('/offer-form')}
            className="add-offer-button"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
          </section>
          <section>
            <h1>Add offer</h1>
          </section>
      </aside>
    </MapContainer>
  );
}

export default OverviewMap;

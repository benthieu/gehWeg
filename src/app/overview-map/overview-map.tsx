import {LatLngLiteral, LatLngTuple} from 'leaflet';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from 'react-router-dom';
import StateContext from "../state/state.context";
import {useContext} from "react";


export function OverviewMap() {
  const navigate = useNavigate();

  const locationBern: LatLngLiteral = {
    lat: 46.947707374681514,
    lng: 7.445807175401288,
  };

  const {offers} = useContext(StateContext);

  function OfferMarkers() {
    return offers.map(offer => {
        const sub = offer.subject;
        const coordinates = JSON.parse(offer.location).coordinates as LatLngTuple;
        const desc = offer.description;
        const key = offer.id;

        return <Marker key = {key} position={coordinates} eventHandlers={{
          click: () => {
            console.log('clicked on', sub)
          },
        }}>
          <Popup>
            {sub} <br/> {desc}
          </Popup>
        </Marker>
      }
    );
  }

  return (
    <MapContainer center={locationBern} zoom={13} scrollWheelZoom={false}>
      <header className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </header>
      <main>
        <section>
          <OfferMarkers />
        </section>
      </main>
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

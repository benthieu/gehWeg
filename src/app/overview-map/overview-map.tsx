import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { useContext, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import OfferDetailModal from '../offer/offer-detail-modal';
import StateContext from '../state/state.context';
import { Offer } from '../state/supabase/database.types';

export function OverviewMap() {
  const navigate = useNavigate();
  const { offers} = useContext(StateContext);
  const [activeOffer, setOfferActive] = useState<Offer | null>(null);

  return (
    <>
      <div className="header">
        <h3>
          gehWeg
        </h3>
      </div>
      <MapContainer
        center={{
          lat: 46.947707374681514,
          lng: 7.445807175401288,
        }}
        zoom={13}
        scrollWheelZoom={false}
      >
        <header className="map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </header>
        <main>
          <section>
            {offers.map((offer) => {
              return offer.location ? (
                <Marker
                  key={offer.id}
                  position={offer.location}
                  eventHandlers={{
                    click: () => setOfferActive(offer),
                  }}
                ></Marker>
              ) : null;
            })}
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
        </aside>
      </MapContainer>
      {activeOffer ? (
        <OfferDetailModal
          offer={activeOffer}
          offerClosed={() => setOfferActive(null)}
        />
      ) : null}
    </>
  );
}

export default OverviewMap;

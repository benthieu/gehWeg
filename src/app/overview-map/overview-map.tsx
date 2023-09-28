import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { memo, useCallback, useContext, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import OfferDetailModal from '../offer/offer-detail-modal';
import StateContext from '../state/state.context';
import { Offer, OffersInViewArgs } from '../state/supabase/database.types';
import { MapsBoundsListener } from './maps-bounds-listener';

const MemoMapsBoundsListener = memo(MapsBoundsListener);

export function OverviewMap() {
  const navigate = useNavigate();
  const { offers, loadMapOffers } = useContext(StateContext);
  const [activeOffer, setOfferActive] = useState<Offer | null>(null);
  const [bounds, setBounds] = useState<OffersInViewArgs | null>(null);
  function handleOfferClosed(reload: boolean) {
    if (reload && bounds) {
      loadMapOffers(bounds);
    }
    setOfferActive(null);
  }
  const handleBoundsChange = useCallback((newBounds: OffersInViewArgs) => {
    setBounds(newBounds);
    loadMapOffers(newBounds);
  }, []);

  return (
    <>
      <div className="header">
        <h3>gehWeg</h3>
      </div>
      <MapContainer
        center={{
          lat: 46.947707374681514,
          lng: 7.445807175401288,
        }}
        zoom={15}
        scrollWheelZoom={false}
      >
        <MemoMapsBoundsListener
          boundsChanged={handleBoundsChange}
        ></MemoMapsBoundsListener>
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
                  opacity={offer.status === 'new' ? 1 : 0.5}
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
          offerClosed={(reload) => handleOfferClosed(reload)}
        />
      ) : null}
    </>
  );
}

export default OverviewMap;

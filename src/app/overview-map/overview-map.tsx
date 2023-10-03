import AddIcon from '@mui/icons-material/Add';
import { Fab, Tooltip } from '@mui/material';
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import OfferDetailModal from '../offer/offer-detail-modal';
import StateContext from '../state/state.context';
import { Offer, OffersInViewArgs } from '../state/supabase/database.types';
import { MapsBoundsListener } from './maps-bounds-listener';

const MemoMapsBoundsListener = memo(MapsBoundsListener);

export function OverviewMap() {
  const navigate = useNavigate();
  const { offers, loadMapOffers, latestOfferUpdate } = useContext(StateContext);
  const [activeOffer, setOfferActive] = useState<Offer | null>(null);
  const bounds = useRef<OffersInViewArgs | null>(null);
  function handleOfferClosed(reload: boolean) {
    if (reload && bounds.current) {
      loadMapOffers(bounds.current);
    }
    setOfferActive(null);
  }
  const handleBoundsChange = useCallback((newBounds: OffersInViewArgs) => {
    bounds.current = newBounds;
    loadMapOffers(newBounds);
  }, [loadMapOffers]);

  useEffect(() => {
    if (latestOfferUpdate && bounds.current) {
      loadMapOffers(bounds.current);
    }
  }, [latestOfferUpdate, loadMapOffers]);

  return (
    <>
      <div className="header">
        <div className="header-start"></div>
        <h3>gehWeg</h3>
        <div className="header-end">
          <Tooltip title="Neues Angebot erfassen">
            <Fab
              onClick={() => navigate('/offer-form')}
              color="success"
              size="small"
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
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

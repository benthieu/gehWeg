import { Box, Button, Modal, Typography } from '@mui/material';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useContext, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import StateContext from '../state/state.context';
import { Offer } from '../state/supabase/database.types';
import { formatCHDate } from '../utils/date-utils';
import { OfferImage } from './offer-image';
import { FilterProps } from '../offer-list-filter/list-filter';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
};

interface OfferDetailModalProperties {
  offer: Offer;
  offerClosed: (hasChanged: boolean) => void;
  reloadList: (FilterProps: FilterProps) => void;
}

export default function OfferDetailModal({
  offer,
  offerClosed,
  reloadList,
}: OfferDetailModalProperties) {
  const { setAlert, users, activeUser } = useContext(StateContext);
  const [open, setOpen] = useState(true);
  const [imageActive, setImageActive] = useState(false);
  const supabase = useSupabaseClient();
  const user = users.find((user) => user.id === offer.created_by);

  const setOfferClosed = async () => {
    const { error } = await supabase
      .from('Offer')
      .update({
        status: 'closed',
      })
      .eq('id', offer.id);
    if (error) {
      setAlert({
        type: 'error',
        message: 'Der Status konnte leider nicht geändert werden',
      });
      return;
    }
    setAlert({
      type: 'success',
      message: 'Das Angebot wurde aktualisiert',
    });
    handleClose(true);
  };
  const handleClose = (hasChanged = false) => {
    setOpen(false);
    offerClosed(hasChanged);
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('Offer').delete().eq('id', offer.id);

    if (error) {
      setAlert({
        type: 'error',
        message: 'Löschen des Angebots fehlgeschlagen',
      });
    } else {
      handleClose();
      setAlert({
        type: 'success',
        message: 'Angebot gelöscht',
      });

      reloadList({
        category: 0,
        title: '',
      });
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-header">
            <MapContainer
              center={offer.location || undefined}
              zoom={16}
              scrollWheelZoom={false}
            >
              <header className="map">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </header>
              <main>
                <section>
                  {offer.location ? (
                    <Marker
                      position={offer.location}
                      opacity={offer.status === 'new' ? 1 : 0.5}
                    ></Marker>
                  ) : null}
                </section>
              </main>
            </MapContainer>
            {offer.images?.[0] && (
              <div onClick={() => setImageActive((toggle) => !toggle)}>
                <OfferImage
                  className={
                    imageActive
                      ? 'modal-header-img-wrapper'
                      : 'modal-header-small-img-wrapper'
                  }
                  width={90}
                  height={90}
                  image={offer.images?.[0]}
                ></OfferImage>
              </div>
            )}
          </div>
          <div className="modal-content">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {offer.subject}
            </Typography>
            {offer.description && (
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {offer.description}
              </Typography>
            )}
            {offer.street && offer.city && (
              <Typography sx={{ mt: 2 }}>
                {offer.street}
                <br />
                {offer.city} {offer.postal_code}
              </Typography>
            )}
            <Typography sx={{ mt: 2 }}>
              Geteilt seit: {formatCHDate(offer.created_at)}
            </Typography>
            {user && (
              <Typography sx={{ mt: 2 }}>Geteilt von: {user.name}</Typography>
            )}
            <Typography sx={{ mt: 2 }}>
              Status: {offer.status === 'new' ? 'Neu' : 'Abgeholt'}
            </Typography>
            <br />
            {offer.status === 'new' && (
              <Box>
                <Button onClick={() => setOfferClosed()} variant="contained">
                  Ich habs abgeholt
                </Button>
              </Box>
            )}
            {activeUser?.id === offer.created_by && (
              <Box sx={{ mt: 1 }}>
                <Button
                  onClick={handleDelete}
                  color="error"
                  variant="contained"
                >
                  Angebot Löschen
                </Button>
              </Box>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

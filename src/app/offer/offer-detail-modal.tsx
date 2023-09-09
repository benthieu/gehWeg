import { Box, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Offer } from '../state/supabase/database.types';

const style = {
  position: 'absolute' as 'absolute',
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
  offerClosed: () => void;
}

export default function OfferDetailModal({
  offer,
  offerClosed,
}: OfferDetailModalProperties) {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    offerClosed();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='modal-header'>
            <MapContainer
              center={offer.location}
              zoom={16}
              scrollWheelZoom={false}
            >
              <header className="map">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </header>
              <main>
                <section>
                  {offer.location ? (
                    <Marker position={offer.location}></Marker>
                  ) : null}
                </section>
              </main>
            </MapContainer>
          </div>
          <div className="modal-content">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {offer.subject}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {offer.description}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              {offer.street}<br/>
              {offer.city} {offer.postal_code}
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

import { useState } from 'react';
import OfferGeolocationModal from './offer-geolocation-modal';
import { Box, Divider, ListItemButton, ListItemText } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DoneIcon from '@mui/icons-material/Done';
import { Tables } from 'src/app/state/supabase/database.types';
import { LatLngLiteral } from 'leaflet';

type AddGeolocationButtonProps = {
  offer: Partial<Tables<'Offer'>>;
  setOfferLocation: (event: {latlng: { lat: number; lng: number}}, address: string) => void,
  defaultLocation: LatLngLiteral
};
function AddGeolocationButton({ offer, setOfferLocation, defaultLocation}: AddGeolocationButtonProps) {
  const [geolocationModalOpened, setGeolocationModalOpened] = useState(false);

  return (
    <>
      {geolocationModalOpened ? (
        <OfferGeolocationModal
          location={
            offer.location ? (offer.location as LatLngLiteral) : defaultLocation
          }
          handleClickOnMap={setOfferLocation}
          addGeolocationClosed={() => setGeolocationModalOpened(false)}
        />
      ) : null}
      <ListItemButton onClick={() => setGeolocationModalOpened(true)}>
        <Box marginRight={2}>
          <PlaceIcon color="primary" fontSize="small"></PlaceIcon>
        </Box>
        <ListItemText
          primary={
            offer.street
              ? `${offer.street}, ${
                  offer.postal_code ? offer.postal_code : ''
                } ${offer.city}`
              : 'Ort hinzufügen'
          }
          secondary={offer.street ? 'Klicken um Ort zu ändern' : ''}
        ></ListItemText>
        <Box>
          {offer.street ? (
            <DoneIcon color="success" fontSize="medium" />
          ) : (
            <ArrowForwardIosIcon
              color="primary"
              fontSize="small"
            ></ArrowForwardIosIcon>
          )}
        </Box>
      </ListItemButton>
      <Divider />
    </>
  );
}

export default AddGeolocationButton;

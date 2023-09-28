import { Typography, Box, Stack, Tooltip, Modal } from '@mui/material';
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { LatLngLiteral, LeafletMouseEvent} from 'leaflet';
import Geocode from 'react-geocode';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Option } from 'react-google-places-autocomplete/build/types';
import { PropsValue, SingleValue } from 'react-select';
import { useState } from 'react';


type AddOfferLocationProps = {
  location: LatLngLiteral | undefined;
  handleClickOnMap: (
    event: { latlng: { lat: number; lng: number } },
    address: string
  ) => void,
  addGeolocationClosed: (closed: boolean) => void
};

const style = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  // overflow: 'scroll',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
};

Geocode.setApiKey('AIzaSyDX7buq-sfinghkw3M6TSoA8Jc_RnUxdvc');
Geocode.setLanguage('en');
Geocode.setRegion('ch');
Geocode.enableDebug();

export function OfferGeolocationModal({
  location,
  handleClickOnMap: updateOfferLocation,
  addGeolocationClosed
}: AddOfferLocationProps) {
  const [addressInput, setAddressInput] = useState<PropsValue<Option>>();
  const [addressDisplay, setAddressDisplay] = useState<string>();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    addGeolocationClosed(true);
  };


  const MapEvents = () => {
    useMapEvents({
      click(e) {
        mapGeolocationToAddress(e);
      },
    });
    return false;
  };

  function mapGeolocationToAddress(
    e: LeafletMouseEvent | { latlng: { lat: number; lng: number } }
  ) {
    Geocode.fromLatLng(e.latlng.lat.toString(), e.latlng.lng.toString()).then(
      (response) => {
        const googleMapsAddress = response.results[0].formatted_address;
        setAddressInput(googleMapsAddress);
        setAddressDisplay(googleMapsAddress);
        updateOfferLocation(
          { latlng: { lat: e.latlng.lat, lng: e.latlng.lng } },
          googleMapsAddress
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  function mapAddressToGeolocation(e: SingleValue<Option>) {
    if (e) {
      Geocode.fromAddress(e.label).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          const latlng = { latlng: { lat: lat, lng: lng } };
          mapGeolocationToAddress(latlng); // To set address in the offer
        },
        (error) => {
          console.error('error in handle adderss input', error);
        }
      );
    }
  }

  type CenterMapProps = {
    center: LatLngLiteral;
    zoom: number;
  };

  function ChangeView({ center, zoom }: CenterMapProps) {
    const map = useMap();
    if (center && zoom) {
      map.setView(center, zoom);
    }
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <Stack direction="column" m={1}>
        <Typography mx={1} fontSize={15}>
          {addressDisplay}
        </Typography>
        <Tooltip title="Standort in Karte setzen oder Adresse unterhalb eingeben">
          <Box mt={1}>
            <MapContainer
              style={{ height: `250px` }}
              center={location}
              zoom={16}
              scrollWheelZoom={false}
              doubleClickZoom
            >
              <ChangeView
                center={
                  location ?? {
                    lat: 46.947707374681514,
                    lng: 7.445807175401288,
                  }
                }
                zoom={16}
              ></ChangeView>
              <header className="map">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </header>
              <MapEvents />
              <main>
                <section>
                  {location ? <Marker position={location}></Marker> : null}
                </section>
              </main>
            </MapContainer>
            <GooglePlacesAutocomplete
              apiKey="AIzaSyDX7buq-sfinghkw3M6TSoA8Jc_RnUxdvc"
              autocompletionRequest={{
                componentRestrictions: {
                  country: ['ch'],
                },
              }}              
              selectProps={{
                placeholder: 'Adresse eingeben',
                isClearable: true,
                value: addressInput,
                onChange: (event) => mapAddressToGeolocation(event),
              }}
            />
          </Box>
        </Tooltip>
      </Stack>
      </Box>
    </Modal>
  );
}

export default OfferGeolocationModal;

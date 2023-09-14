import { Typography, Box, Stack } from '@mui/material';
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { LatLngLiteral, LeafletMouseEvent } from 'leaflet';
import Geocode from 'react-geocode';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Option } from 'react-google-places-autocomplete/build/types';
import { SingleValue } from 'react-select';
import { useState } from 'react';

type AddOfferLocationProps = {
  location: LatLngLiteral | undefined;
  handleClickOnMap: (event: { latlng: { lat: number; lng: number } }) => void;
};

Geocode.setApiKey('AIzaSyDX7buq-sfinghkw3M6TSoA8Jc_RnUxdvc');
Geocode.setLanguage('en');
Geocode.setRegion('ch');
Geocode.enableDebug();

export function OfferGeolocation({
  location,
  handleClickOnMap,
}: AddOfferLocationProps) {
  const [addressInput, setAddressInput] = useState('');
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        handleClickOnMap(e);
        findAddress(e);
      },
    });
    return false;
  };

  function handleAdressInput(e: SingleValue<Option>) {
    if (e) {
      setAddressInput(e.label);
      console.log('handleAdressInput input: ', e);
      Geocode.fromAddress(e.label).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          const latlng = { latlng: { lat: lat, lng: lng } };
          handleClickOnMap(latlng);
        },
        (error) => {
          console.error('error in handle adderss input', error);
        }
      );
    }
  }

  function findAddress(
    e: LeafletMouseEvent | { latlng: { lat: number; lng: number } }
  ) {
    console.log('event in find adress: ', e);
    Geocode.fromLatLng(e.latlng.lat.toString(), e.latlng.lng.toString()).then(
      (response) => {
        console.log('response from laglng: ', response);
        const address = response.results[0].formatted_address;
        setAddressInput(address);
        console.log('addressInput: ', addressInput);
      },
      (error) => {
        console.error(error);
      }
    );
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
    <Box mx={1}>
      <Stack direction="column" m={1}>
        <Typography variant="h6" mx={1}>
          Standort
        </Typography>
        <MapContainer
          style={{ height: `300px`, width: `300px` }}
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
        <Box>
          <GooglePlacesAutocomplete
            apiKey="AIzaSyDX7buq-sfinghkw3M6TSoA8Jc_RnUxdvc"
            autocompletionRequest={{
              componentRestrictions: {
                country: ['ch'],
              },
            }}
            selectProps={{
              isClearable: true,
              value: addressInput,
              placeholder: addressInput
                ? addressInput
                : 'Standort in Karte setzen oder hier eingeben',
              onChange: (event) => handleAdressInput(event),
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default OfferGeolocation;

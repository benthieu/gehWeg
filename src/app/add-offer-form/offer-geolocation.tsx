import { Typography, Box, Stack, Tooltip } from '@mui/material';
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
import { PropsValue, SingleValue } from 'react-select';
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
  handleClickOnMap: updateOffer,
}: AddOfferLocationProps) {
  const [addressInput, setAddressInput] = useState<PropsValue<Option>>();
  const [addressDisplay, setAddressDisplay] = useState<string>();

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        updateOffer(e);
        mapGeolocationToAddress(e);
      },
    });
    return false;
  };

  function mapAddressToGeolocation(e: SingleValue<Option>) {
    if (e) {
      Geocode.fromAddress(e.label).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          const latlng = { latlng: { lat: lat, lng: lng } };
          updateOffer(latlng);
          setAddressDisplay(e.label);
        },
        (error) => {
          console.error('error in handle adderss input', error);
        }
      );
    }
  }

  function mapGeolocationToAddress(
    e: LeafletMouseEvent | { latlng: { lat: number; lng: number } }
  ) {
    Geocode.fromLatLng(e.latlng.lat.toString(), e.latlng.lng.toString()).then(
      (response) => {
        const googleMapsAddress = response.results[0].formatted_address;
        setAddressInput(googleMapsAddress);
        setAddressDisplay(googleMapsAddress);
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
    <Stack direction="column" m={1} mt={3}>
      <Typography mx={1} fontSize={15}>{addressDisplay}</Typography>
      <Tooltip title='Standort in Karte setzen oder Adresse unterhalb eingeben'>
        <Box>
        <MapContainer
          style={{ height: `300px` }}
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
            placeholder: "Adresse eingeben",
            isClearable: true,
            value: addressInput,
            onChange: (event) => mapAddressToGeolocation(event),
          }}
        />
      </Box>
      </Tooltip>

    </Stack>
  );
}

export default OfferGeolocation;

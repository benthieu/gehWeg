import { Typography, Box, Stack, TextField } from '@mui/material';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { LatLngLiteral, LeafletMouseEvent } from 'leaflet';
import Geocode from 'react-geocode';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Option } from 'react-google-places-autocomplete/build/types';
import { SingleValue } from 'react-select';
import { useState } from 'react';

type AddOfferLocationProps = {
  location: LatLngLiteral;
  handleClickOnMap: (event: LeafletMouseEvent) => void;
  defaultLocation: LatLngLiteral | undefined;
};

export function OfferGeolocation({
  location,
  handleClickOnMap,
  defaultLocation,
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

  Geocode.setApiKey('AIzaSyDX7buq-sfinghkw3M6TSoA8Jc_RnUxdvc');
  Geocode.setLanguage('en');
  Geocode.setRegion('ch');
  Geocode.enableDebug();


  function handleAdressInput(e: SingleValue<Option>) {
    setAddressInput(e.label)
    console.log('handleAdressInput input: ', e)
    Geocode.fromAddress(e?.label).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const latlng = { latlng: { lat: lat, lng: lng } };
        handleClickOnMap(latlng);
        
      },
      (error) => {
        console.error('error in handle adderss input',error);
      }
    );
  }

  function findAddress(e) {
    console.log('event in find adress: ', e)
    Geocode.fromLatLng(e.latlng.lat, e.latlng.lng).then(
      (response) => {
        console.log('response from laglng: ', response);
        const address = response.results[0].formatted_address;
        setAddressInput(address);
        console.log('addressInput: ', addressInput)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <Box mx={1}>
      <Stack direction="column" m={1}>
        <Typography variant="h6" mx={1}>
          Standort
        </Typography>
        <div></div>
        <TextField
          type="text"
          required
          id="offer-title"
          variant="standard"
          onChange={(event) => {
            showGeocode(event);
          }}
        />
        <MapContainer
          style={{ height: `300px`, width: `300px` }}
          center={location}
          zoom={16}
          scrollWheelZoom={false}
          doubleClickZoom
        >
          <ChangeView center={location} zoom={16}></ChangeView>
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
                country: ["ch"],
              },
            }}
            selectProps={{
              isClearable: true,
              value: addressInput,
              placeholder: addressInput,
              onChange: (event) => handleAdressInput(event)
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default OfferGeolocation;

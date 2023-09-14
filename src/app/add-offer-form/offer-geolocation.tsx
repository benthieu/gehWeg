import { Typography, Box, Stack } from '@mui/material';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';

type AddOfferLocationProps = {
  location: LatLngLiteral | undefined;
  handleClickOnMap: (event: any) => void;
};

export function OfferGeolocation({
  location,
  handleClickOnMap,
}: AddOfferLocationProps) {
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        handleClickOnMap(e);
      },
    });
    return false;
  };

  return (
    <Box mx={1}>
      <Stack direction="column" m={1}>
        <Typography variant="h6" mx={1}>
          Wo steht das Angebot?
        </Typography>
        <MapContainer
          style={{ height: `300px`, width: `300px` }}
          center={location}
          zoom={16}
          scrollWheelZoom={false}
          doubleClickZoom
        >
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
      </Stack>
    </Box>
  );
}

export default OfferGeolocation;

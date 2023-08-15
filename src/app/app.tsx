// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { MapContainer, TileLayer } from 'react-leaflet';
import User from './components/Users';

export function App() {
  return (
    <div>
      <User/>
      <MapContainer center={[46.947707374681514, 7.445807175401288]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default App;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { MapContainer, TileLayer } from 'react-leaflet';
import User from './components/Users';
import FileSaver from './components/FileSaver';
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';

export function App() {
  const [email, setEmail] = useState('');
  const user = useUser();
  const supabase = useSupabaseClient();
  console.log(email);

  async function magicLinkLogin(): Promise<void> {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
    });

    if (error) {
      alert(
        'Error communicating with supabase, make sure to use a real email address!'
      );
      console.log(error);
    } else {
      alert("Check your email to log in with a supabase magic link")
    }
  }

  async function signOut(): void {
    const {error} = await supabase.auth.signOut();
  }

  return (
    <Container align="center" className="container-sm mt-4">
      {/* If the user does not exist, show login page  
      If the user exists, show main page
     */}
      { /* user === null ? (
        <>
          <h1>Welcome to gehWeg</h1>
          <Form>
            <Form.Group className="mb-3" style={{ maxWidth: '500px' }}>
              <Form.Label>
                Enter an email to login with a Supabase Magic Link
              </Form.Label>
              <FormControl
                type="email"
                placeholder="Enter an email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <Button variant="primary mt-3" onClick={() => magicLinkLogin()}>
                Get Magic Link{' '}
              </Button>
            </Form.Group>
          </Form>
        </>
      ) : ( */ }
        <>
          <User />
          <p>Current user: {user?.email}</p>
          <Button onClick={() => signOut()}>Sign out</Button>
          <FileSaver></FileSaver>
       {/*   <MapContainer
            center={[46.947707374681514, 7.445807175401288]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer> */}
        </>
      
    </Container>
  );
}

export default App;

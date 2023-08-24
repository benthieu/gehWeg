// eslint-disable-next-line @typescript-eslint/no-unused-vars

import User from './components/Users';
import FileSaver from './components/FileSaver';
import {
  Container,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';

export function App() {
  const [email, setEmail] = useState('');
  const user = useUser();
  const supabase = useSupabaseClient();
  console.log(email);

  return (
    <Container align="center" className="container-sm mt-4">
          <User />
          <FileSaver></FileSaver>
    </Container>
  );
}

export default App;

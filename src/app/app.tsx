
import {

  Container,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Camera from './components/camera/camera';

export function App() {

  return (
    <Container align="center" className="container-sm mt-4">
          <Camera/>
    </Container>
  );
}

export default App;

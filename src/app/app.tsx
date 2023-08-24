
import {

  Container,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomWebcam from './components/custom-webcam';

export function App() {

  return (
    <Container align="center" className="container-sm mt-4">
          <CustomWebcam/>
    </Container>
  );
}

export default App;

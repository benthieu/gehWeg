import Camera from './components/Camera';
import {
  Button,
  Container,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {

  function takePicture(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Container align="center" className="container-sm mt-4">
          <Camera />
   
    </Container>
  );
}

export default App;

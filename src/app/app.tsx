import User from './components/Users';
import FileSaver from './components/FileSaver';
import {
  Container,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {

  return (
    <Container align="center" className="container-sm mt-4">
          <User />
          <FileSaver></FileSaver>
    </Container>
  );
}

export default App;

import User from './components/Users';
import FileUpload from './components/FileUpload';
import {
  Container,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {

  return (
    <Container align="center" className="container-sm mt-4">
          <User />
          <FileUpload></FileUpload>
    </Container>
  );
}

export default App;

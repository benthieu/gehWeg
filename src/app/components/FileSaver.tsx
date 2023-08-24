import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ErrorBoundary } from 'react-error-boundary';
import { v4 as uuidv4 } from 'uuid';


// Link base url to load images, image id added in functions uploadFile and getImages
const CDNURL = 'https://sjnxrpazstalmggosrcy.supabase.co/storage/v1/object/public/images/admin/';

function FileSaver() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [images, setImages] = useState([]);

  async function uploadFile(event: any): Promise<void> {
    console.log('user: ', user)
    const image = event?.target?.files[0];
    const { data, error } = await supabase.storage
      .from('images')
      .upload('admin/' + uuidv4(), image);

    if (error) {
      console.log('error: ' + typeof error, error);
      alert('error: ' + error.error + ', ' + error.message);
    } else {
      getImages();
    }
  }

  async function getImages() {
    console.log('getImges called...')
    const {data, error} = await supabase
    .storage
    .from('images')
    .list('admin/', {
      limit: 20,
      offset: 0,
      sortBy: { column: "name", order: "asc"}
    });

    if (data !== null) {
      console.log('data', data);
      setImages(data);
    } else {
      alert('Error loading imgaes');
      console.log(error);
    }
  }

  useEffect(() => {
    getImages();
  },
  [user])

  return (
    <div>
      <ErrorBoundary
        onError={(error) => alert(error)}
        FallbackComponent={FallbackComponent}
      >
        <p>Choose file to upload</p>
        <Form.Group className="mb-3" style={{ maxWidth: '500px' }}>
          <Form.Control
            type="file"
            accept="image/png, image/jpeg, image/jpeg"
            onChange={(event) => uploadFile(event)}
          />
        </Form.Group>
        <Row xs={1} md={3} className="g-4">
          {images.map((image) => {
            return (
              <Col key={CDNURL + image.name}>
              <Card>
                <Card.Img variant="top" src={CDNURL + image.name}/>
                <Card.Body>
                  <Button variant="danger">Delete Image</Button>
                </Card.Body>
              </Card>
              </Col>
            )  
          })}
        </Row>
      </ErrorBoundary>
    </div>
  );
}

export default FileSaver;

function FallbackComponent() {
  return <>{alert("Error occured...")}</>;
}



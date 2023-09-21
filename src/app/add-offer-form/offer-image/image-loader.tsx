import {
  Button,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
} from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Image } from '../add-offer-form';
import Camera from './camera';
import CustomWebcam from './custom-webcam';
import { useEffect, useState } from 'react';

type ImageLoaderProps = {
  images: Image[];
  addImage: (event: any) => void;
  removeImage: (imageId: string) => void;
  addPhoto: (imageUrl: string) => void;
};
function ImageLoader({
  images,
  addImage,
  removeImage,
  addPhoto,
}: ImageLoaderProps) {

  const [cameraOpened, setCameraOpened] = useState(false);



  const openCamera = () => {
    console.log('openCamera called');
    setCameraOpened(() => true);
  };



  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <ErrorBoundary
        onError={(error) => alert(error)}
        FallbackComponent={FallbackComponent}
      >
        <Stack direction="column" alignItems="center" spacing={2}>
          {/* <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          > */}
            <Camera addPhoto={addPhoto} addImageFromFile={addImage}/>
 
            {/* <PhotoCamera /> */}
          {/* </IconButton> */}
        </Stack>
        <Stack direction="column" alignItems="center" spacing={2}>
          <ImageList sx={{ maxWidth: 210, maxHeight: 210 }} cols={1}>
            {images?.map((image) => (
              <ImageListItem key={image.imageId}>
                <img src={image.imageUrl} alt={image.imageUrl} loading="lazy" />
                <Button onClick={() => removeImage(image.imageId)}>
                  Delete
                </Button>
              </ImageListItem>
            ))}
          </ImageList>
        </Stack>
      </ErrorBoundary>
    </Container>
  );
}

export default ImageLoader;

function FallbackComponent() {
  return <>{alert('Error occured...')}</>;
}

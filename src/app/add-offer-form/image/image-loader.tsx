import { Box, ListItemButton, ListItemText, Stack } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import { Image } from '../add-offer-form';
import Camera from './camera';
import PhotoList from './photo-list';
import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

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

  return (
    <Box>
      {images.length <= 0 ? (
        <ListItemButton
          onClick={() => {
            setCameraOpened(() => true);
          }}
        >
          <Box marginRight={2}>
            <PhotoCamera color="primary" fontSize="small"></PhotoCamera>
          </Box>
          <ListItemText primary={'Foto hinzufügen'}></ListItemText>
          <Box>
            <ArrowForwardIosIcon
              color="primary"
              fontSize="small"
            ></ArrowForwardIosIcon>
          </Box>
        </ListItemButton>
      ) : (
        <Stack direction="column" m={1}>
          <ErrorBoundary
            onError={(error) => alert(error)}
            FallbackComponent={FallbackComponent}
          >
            <Stack direction="column" alignItems="center" spacing={2}>
              <Camera
                addPhoto={addPhoto}
                addImageFromFile={addImage}
                images={images}
                removeImage={removeImage}
                cameraOpened={cameraOpened}
              />
            </Stack>
            <PhotoList images={images} removeImage={removeImage}></PhotoList>
          </ErrorBoundary>
        </Stack>
      )}
    </Box>
  );
}

export default ImageLoader;

function FallbackComponent() {
  return <>{alert('Error occured...')}</>;
}

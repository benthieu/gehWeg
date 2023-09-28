import { Box, Button, ImageList, ImageListItem, Stack } from '@mui/material';
import { useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import StateContext from '../../state/state.context';
import { Image } from '../add-offer-form';
import Camera from './camera';

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
  const { setAlert } = useContext(StateContext);
  function unknownErrorOccured() {
    setAlert({
      type: 'error',
      message: 'Ein Fehler ist aufgetreten',
    });
  }
  return (
    <Box>
      <Stack direction="column" m={1}>
        <ErrorBoundary
          onError={() => unknownErrorOccured()}
          FallbackComponent={FallbackComponent}
        >
          <Stack direction="column" alignItems="center" spacing={2}>
            <Camera addPhoto={addPhoto} addImageFromFile={addImage} />
          </Stack>
          <Stack direction="column" alignItems="center" spacing={2}>
            <ImageList sx={{ maxWidth: 300, maxHeight: 300 }} cols={1}>
              {images?.map((image) => (
                <ImageListItem key={image.imageId}>
                  <img
                    src={image.imageUrl}
                    alt={image.imageUrl}
                    loading="lazy"
                  />
                  <Button onClick={() => removeImage(image.imageId)}>
                    Bild entfernen
                  </Button>
                </ImageListItem>
              ))}
            </ImageList>
          </Stack>
        </ErrorBoundary>
      </Stack>
    </Box>
  );
}

export default ImageLoader;

function FallbackComponent() {
  return <></>;
}

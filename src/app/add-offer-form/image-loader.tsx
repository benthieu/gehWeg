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

// Link base url to load images, image id added in functions uploadFile and getImages
const CDNURL =
  'https://sjnxrpazstalmggosrcy.supabase.co/storage/v1/object/public/images/admin/';

function ImageLoader({images, addImage, removeImage}) {

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <ErrorBoundary
        onError={(error) => alert(error)}
        FallbackComponent={FallbackComponent}
      >
        <Stack direction="column" alignItems="center" spacing={2}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(event) => addImage(event)}
            />
            <PhotoCamera />
          </IconButton>
        </Stack>
        <Stack direction="column" alignItems="center" spacing={2}>
        <ImageList sx={{ maxWidth: 210, maxHeight: 210 }} cols={1}>
          {images?.map((image) => (
            <ImageListItem key={image.imageId}>
              <img src={image.imageUrl} alt={image.imageUrl} loading="lazy" />
              <Button onClick={() => removeImage(image.imageId)}>Delete</Button>
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

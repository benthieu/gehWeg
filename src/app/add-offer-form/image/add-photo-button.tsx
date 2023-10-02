import { useContext, useState } from 'react';
import { Box, Divider, ListItemButton, ListItemText, Stack } from '@mui/material';
import StateContext from '../../state/state.context';
import { Image } from '../add-offer-form';
import Camera from './camera';
import PhotoList from './photo-list';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { ErrorBoundary } from 'react-error-boundary';

type AddPhotoButtonProps = {
  images: Image[];
  addImage: (event: any) => void;
  removeImage: (imageId: string) => void;
  addPhoto: (imageUrl: string) => void;
};
function AddPhotoButton({
  images,
  addImage,
  removeImage,
  addPhoto,
}: AddPhotoButtonProps) {
  const [cameraOpened, setCameraOpened] = useState(false);
  const { setAlert } = useContext(StateContext);
  const [cameraPermissionDenied, setCameraPermissionDenied] =
    useState<boolean>(false);

  function unknownErrorOccured() {
    setAlert({
      type: 'error',
      message: 'Ein Fehler ist aufgetreten',
    });
  }

  const openCamera = () => {
    if (!cameraPermissionDenied) {
      console.log('camera permitted')
      setCameraOpened(true);
    } else {
      console.log('camera permission denied')
      setAlert({
        type: 'error',
        message: 'Bitte Berechtigung für die Kamera im Browser erteilen',
      });
      setCameraPermissionDenied(() => false);
    }
  };
  return (
    <ErrorBoundary
      onError={() => unknownErrorOccured()}
      FallbackComponent={FallbackComponent}
    >
      <Box>
        {images.length <= 0 && !cameraOpened ? (
          <ListItemButton
            onClick={() => {
              openCamera();
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
            <Stack direction="column" alignItems="center" spacing={2}>
              <Camera
                addPhoto={addPhoto}
                addImageFromFile={addImage}
                images={images}
                removeImage={removeImage}
                setCameraOpened={setCameraOpened}
                cameraOpened={cameraOpened}
                cameraPermissionDenied={cameraPermissionDenied}
                setCameraPermissionDenied={setCameraPermissionDenied}
              />
            </Stack>
            <PhotoList images={images} removeImage={removeImage}></PhotoList>
          </Stack>
        )}
      </Box>
      <Divider/>
    </ErrorBoundary>
  );
}

export default AddPhotoButton;

function FallbackComponent() {
  return null;
}

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useContext } from 'react';
import StateContext from '../../state/state.context';
import { Image } from '../add-offer-form';
import CustomWebcam from './custom-webcam';

type CameraProps = {
  addPhoto: (imageUrl: string) => void;
  addImageFromFile: (event: Blob | MediaSource) => void;
  images: Image[];
  removeImage: (imageId: string) => void;
  setCameraOpened: (value: boolean) => void;
  cameraOpened: boolean;
  cameraPermissionDenied: boolean;
  setCameraPermissionDenied: (value: boolean) => void;
};

const Camera = ({
  addPhoto,
  addImageFromFile,
  images,
  removeImage,
  cameraOpened,
  setCameraOpened,
  cameraPermissionDenied,
  setCameraPermissionDenied,
}: CameraProps) => {
  const { setAlert } = useContext(StateContext);

  const openCamera = () => {
    if (!cameraPermissionDenied) {
      setCameraOpened(true);
    } else {
      setAlert({
        type: 'error',
        message: 'Bitte Berechtigung für die Kamera im Browser erteilen',
      });
      setCameraPermissionDenied(false);
    }
  };

  return (
    <Box>
      {cameraOpened ? (
        <CustomWebcam
          setCameraOpened={setCameraOpened}
          addPhoto={addPhoto}
          addImageFromFile={addImageFromFile}
          handleCameraPermissionDenied={() => setCameraPermissionDenied(true)}
          images={images}
          removeImage={removeImage}
          open={cameraOpened}
        />
      ) : (
        <Tooltip title="Bild hinzufügen">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={openCamera}
          >
            <PhotoCamera />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default Camera;

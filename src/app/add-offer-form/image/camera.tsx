import CustomWebcam from './custom-webcam';
import { useContext } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Image } from '../add-offer-form';
import StateContext from '../../state/state.context';

type CameraProps = {
  addPhoto: (imageUrl: string) => void;
  addImageFromFile: (event: any) => void;
  images: Image[];
  removeImage: (imageId: string) => void;
  setCameraOpened: (value: boolean) => void;
  cameraOpened: boolean;
  cameraPermissionDenied: boolean,
  setCameraPermissionDenied: (value: boolean) => void
};

const Camera = ({
  addPhoto,
  addImageFromFile,
  images,
  removeImage,
  cameraOpened,
  setCameraOpened,
  cameraPermissionDenied,
  setCameraPermissionDenied
}: CameraProps) => {
    const {setAlert} = useContext(StateContext);

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

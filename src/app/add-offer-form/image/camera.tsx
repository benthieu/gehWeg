import CustomWebcam from './custom-webcam';
import { useState } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box, IconButton, Tooltip } from '@mui/material';

type CameraProps = {
  addPhoto: (imageUrl: string) => void;
  addImageFromFile: (event: any) => void;
};

const Camera = ({ addPhoto, addImageFromFile }: CameraProps) => {
  const [cameraOpened, setCameraOpened] = useState(false);
  const [cameraPermissionDenied, setCameraPermissionDenied] =
    useState<boolean>(false);

  const openCamera = () => {
    if (!cameraPermissionDenied) {
      setCameraOpened(() => true);
    } else {
      alert('Bitte Berechtigung für die Kamera im Browser erteilen.');
      setCameraPermissionDenied(() => false);
    }
  };

  const closeCamera = () => {
    console.log('closeCamera called');
    setCameraOpened(() => false);
  };

  const handleCameraPermissionDenied = () => {
    setCameraPermissionDenied(() => true);
  };

  return (
    <Box>
      {cameraOpened ? (
        <CustomWebcam
          turnOff={closeCamera}
          addPhoto={addPhoto}
          addImageFromFile={addImageFromFile}
          handleCameraPermissionDenied={handleCameraPermissionDenied}
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

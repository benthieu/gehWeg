import CustomWebcam from './custom-webcam';
import { useState } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Image } from '../add-offer-form';


type CameraProps = {
  addPhoto: (imageUrl: string) => void;
  addImageFromFile: (event: any) => void;
  images: Image[];
  removeImage: (imageId: string) => void;
  cameraOpened: boolean,
};

const Camera = ({ addPhoto, addImageFromFile, images, removeImage, cameraOpened}: CameraProps) => {
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
          images={images} removeImage={removeImage} open={cameraOpened}
          handleClose={closeCamera}
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

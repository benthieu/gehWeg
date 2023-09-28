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
  setCameraOpened: (value: boolean) => void;
  cameraOpened: boolean;
};

const Camera = ({
  addPhoto,
  addImageFromFile,
  images,
  removeImage,
  cameraOpened,
  setCameraOpened: setCameraOpen,
}: CameraProps) => {
  console.log('rendering CameraComponent');

  const [cameraPermissionDenied, setCameraPermissionDenied] =
    useState<boolean>(false);

  const openCamera = () => {
    if (!cameraPermissionDenied) {
      // setCameraOpened(() => true)
      setCameraOpen(true);
    } else {
      alert('Bitte Berechtigung für die Kamera im Browser erteilen.');
      setCameraPermissionDenied(() => false);
    }
  };

  const handleCameraPermissionDenied = () => {
    setCameraPermissionDenied(() => true);
  };

  return (
    <Box>
      {cameraOpened ? (
        <CustomWebcam
          setCameraOpened={setCameraOpen}
          addPhoto={addPhoto}
          addImageFromFile={addImageFromFile}
          handleCameraPermissionDenied={handleCameraPermissionDenied}
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

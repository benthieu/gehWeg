import CustomWebcam from './custom-webcam';
import { useState } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box, IconButton } from '@mui/material';

type CameraProps = {
  addPhoto: (imageUrl: string) => void;
  addImageFromFile: (event: any) => void;
};

const Camera = ({ addPhoto, addImageFromFile }: CameraProps) => {
  const [cameraOpened, setCameraOpened] = useState(false);

  const openCamera = () => {
    setCameraOpened(() => true);
  };

  const closeCamera = () => {
    console.log('closeCamera called');
    setCameraOpened(() => false);
  };

  return (
    <Box>
      {cameraOpened ? (
        <CustomWebcam
          turnOff={closeCamera}
          addPhoto={addPhoto}
          addImageFromFile={addImageFromFile}
        />
      ) : (
        <section>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={openCamera}
          >
            <PhotoCamera />
          </IconButton>
        </section>
      )}
    </Box>
  );
};

export default Camera;

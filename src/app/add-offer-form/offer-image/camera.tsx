import { Button } from '@mui/base';
import CustomWebcam from './custom-webcam';
import { useState } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { IconButton } from '@mui/material';

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
    <div className="container">
      {cameraOpened ? (
        <CustomWebcam
          turnOff={closeCamera}
          addPhoto={addPhoto}
          addImageFromFile={addImageFromFile}
        />
      ) : (
        <section>
          {/* <Button className="mt-1" onClick={openCamera}>
            Take photo
          </Button> */}
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
    </div>
  );
};

export default Camera;

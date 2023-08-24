import { Button } from 'react-bootstrap';
import CustomWebcam from '../custom-webcam/custom-webcam';
import { useState } from 'react';

const Camera = () => {
  const [cameraOpened, setCameraOpened] = useState(false);

  const openCamera = () => {
    setCameraOpened(() => true);
  };

  return (
    <div className="container">
      {cameraOpened ? (
        <CustomWebcam />
      ) : (
        <section>
          <Button className="mt-1" onClick={openCamera}>
            Take photo
          </Button>
        </section>
      )}
    </div>
  );
};

export default Camera;

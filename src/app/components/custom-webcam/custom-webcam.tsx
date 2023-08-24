import { useCallback, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Webcam from 'react-webcam';

const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const constraints = {
    audio: true,
    video: { width: 1280, height: 720 },
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const closeCamera = async () => {
    throw new Error('Not implelented');
  };

  const savePhoto = async () => {
    throw new Error('Not implelented');
  };

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <section>
            <Button className="mt-1" onClick={retake}>
              Retake
            </Button>
            <Button className="mt-1" variant="secondary" onClick={closeCamera}>
              Back
            </Button>
            <Button className="mt-1" variant="danger" onClick={savePhoto}>
              Upload
            </Button>
          </section>
        ) : (
          <section>
            <Button className="mt-1" onClick={capture}>
              Click
            </Button>
            <Button className="mt-1" variant="secondary" onClick={closeCamera}>
              Back
            </Button>
          </section>
        )}
      </div>
    </div>
  );
};

export default CustomWebcam;

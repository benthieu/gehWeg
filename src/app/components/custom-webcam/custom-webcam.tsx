import { useCallback, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Webcam from 'react-webcam';

const CustomWebcam = ({turnOff}: () => void) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const savePhoto = async () => {
    throw new Error('Not implemented');
  };

  return (
    <>
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} />
      )}
      <section>
        {imgSrc ? (
          <section>
            <Button className="mt-1" onClick={retake}>
              Retake
            </Button>
            <Button className="mt-1" variant="secondary" onClick={turnOff}>
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
            <Button className="mt-1" variant="secondary" onClick={turnOff}>
              Back
            </Button>
          </section>
        )}
      </section>
    </>
  );
};

export default CustomWebcam;

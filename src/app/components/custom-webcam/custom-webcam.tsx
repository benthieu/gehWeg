import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useCallback, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Webcam from 'react-webcam';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'base64-arraybuffer';

const CustomWebcam = ({ turnOff }: () => void) => {
  const [images, setImages] = useState([]);
  const supabase = useSupabaseClient();
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
    console.log('imgSrc: ', imgSrc);

    const { error } = await supabase.storage
      .from('images')
      .upload('admin/' + uuidv4(), imgSrc, {
        contentType: 'image/png',
      });

    if (error) {
      console.log('error: ' + typeof error, error);
      alert('error: ' + error.error + ', ' + error.message);
    } else {
      alert('Image saved');
    }
  };

  async function getImages() {
    console.log('getImges called...');
    const { data, error } = await supabase.storage
      .from('images')
      .list('admin/', {
        limit: 20,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });

    if (data !== null) {
      console.log('data', data);
      setImages(data);
    } else {
      alert('Error loading imgaes');
      console.log(error);
    }
  }


  return (
    <>
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam
          height={600}
          width={600}
          ref={webcamRef}
          screenshotFormat="image/png"
        />
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

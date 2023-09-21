import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'base64-arraybuffer';
import { Button } from '@mui/base';
import { IconButton, Tooltip } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';


type CustomWebcamProp = {
  turnOff: () => void;
  addPhoto: (imageUrl: string) => void;
  addImageFromFile: (event) => void;
};

const CustomWebcam = ({
  turnOff,
  addPhoto,
  addImageFromFile,
}: CustomWebcamProp) => {
  const [images, setImages] = useState([]);
  const supabase = useSupabaseClient();
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
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
          height={300}
          width={300}
          ref={webcamRef}
          screenshotFormat="image/png"
        />
      )}
      <section>
        {imgSrc ? (
          <section>
            <Button className="mt-1" onClick={retake}>
              Neues Foto
            </Button>
            <Button className="mt-1" onClick={turnOff}>
              Kamera schliessen
            </Button>
            <Button className="mt-1" onClick={() => addPhoto(imgSrc)}>
              Zum Angebot hinzufügen
            </Button>
            <IconButton>
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(event) => addImageFromFile(event)}
              />
              <FileUploadIcon />
            </IconButton>
          </section>
        ) : (
          <section>
            <Button className="mt-1" onClick={capture}>
              Click
            </Button>
            <Button
              className="mt-1"
              onClick={() => {
                console.log(webcamRef.current);
                turnOff();
              }}
            >
              Kamera schliessen
            </Button>
            <Tooltip title="Bild von Device laden">
            <IconButton
               color="primary"
               aria-label="upload picture"
               component="label">
              <input
                hidden
                color="primary"
                accept="image/*"
                type="file"
                onChange={(event) => addImageFromFile(event)}
              />
              <FileUploadIcon />
            </IconButton>
            </Tooltip>
          </section>
        )}
      </section>
    </>
  );
};

export default CustomWebcam;

import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ClearIcon from '@mui/icons-material/Clear';

type CustomWebcamProp = {
  turnOff: () => void;
  addPhoto: (imageUrl: string) => void;
  addImageFromFile: (event: any) => void;
};

const CustomWebcam = ({
  turnOff,
  addPhoto,
  addImageFromFile,
}: CustomWebcamProp) => {
  const webcamRef = useRef<any>(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      addPhoto(imageSrc);
      setImgSrc(null);
    }
  }, [webcamRef]);

  return (
    <Box>
      <Stack direction="column">
        <Webcam
          height={300}
          width={300}
          ref={webcamRef}
          screenshotFormat="image/png"
        />
        <Stack direction="row" justifyContent="center">
          <Tooltip title="Bild von Galerie laden">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                color="primary"
                accept="image/*"
                type="file"
                onChange={(event) => addImageFromFile(event)}
              />
              <CollectionsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Foto schiessen">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              onClick={capture}
            >
              <RadioButtonCheckedIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Kamera schliessen">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              onClick={() => turnOff()}
            >
              <ClearIcon fontSize="large" color="disabled" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CustomWebcam;

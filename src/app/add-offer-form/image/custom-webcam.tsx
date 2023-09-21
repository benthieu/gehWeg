/* eslint-disable prefer-const */
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ClearIcon from '@mui/icons-material/Clear';
import LinearProgress from '@mui/material/LinearProgress';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';

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
  const [webcamLoading, setWebcamLoading] = useState<boolean>(true);
  const webcamRef = useRef<any>(null);
  const [imgSrc, setImgSrc] = useState(null);
  const FACING_MODE_USER = 'user';
  const FACING_MODE_ENVIRONMENT = 'environment';
  const [image, setImage] = useState('');

  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);

  let videoConstraints: MediaTrackConstraints = {
    facingMode: facingMode,
    width: 300,
    height: 300,
  };

  const changeFacingMode = useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      addPhoto(imageSrc);
      setImgSrc(null);
    }
  }, [webcamRef]);

  const closeSpinningWheel = () => {
    setWebcamLoading(() => false);
  };

  return (
    <Box>
      <Stack direction="column">
        <Stack justifyContent="center">
          {webcamLoading ? (
            <Box>
              <Typography>Connecting...</Typography>
              <LinearProgress />
            </Box>
          ) : null}
          <Webcam
            height={300}
            width={300}
            ref={webcamRef}
            screenshotFormat="image/png"
            onUserMedia={closeSpinningWheel}
            className="webcam"
            audio={false}
            videoConstraints={videoConstraints}
          />
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Tooltip title="Bild aus Galerie laden">
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
              <CollectionsIcon  color="success" />
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
          <Tooltip title="Kamerausrichtung wechseln">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              onClick={changeFacingMode}
            >
              <CameraswitchIcon />
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

import { Modal } from '@mui/base';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import ClearIcon from '@mui/icons-material/Clear';
import CollectionsIcon from '@mui/icons-material/Collections';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Image } from '../add-offer-form';
import PhotoList from './photo-list';

const style = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95vw',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
};

type CustomWebcamProps = {
  addPhoto: (imageUrl: string) => void;
  addImageFromFile: (file: Blob | MediaSource) => void;
  handleCameraPermissionDenied: () => void;
  images: Image[];
  removeImage: (imageId: string) => void;
  open: boolean;
  setCameraOpened: (value: boolean) => void;
};

const CustomWebcam = ({
  addPhoto,
  addImageFromFile,
  handleCameraPermissionDenied,
  images,
  removeImage,
  open,
  setCameraOpened,
}: CustomWebcamProps) => {
  const [webcamLoading, setWebcamLoading] = useState<boolean>(true);
  const webcamRef = useRef(null);
  const FACING_MODE_USER = 'user';
  const FACING_MODE_ENVIRONMENT = 'environment';
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);

  const videoConstraints: MediaTrackConstraints = {
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
      const imageSrc = (webcamRef.current as Webcam).getScreenshot();
      if (imageSrc) {
        addPhoto(imageSrc);
      }
    }
  }, [addPhoto]);

  const closeConnectionProgressBar = () => {
    setWebcamLoading(() => false);
  };

  const handlePermissionDenied = () => {
    closeConnectionProgressBar();
    setCameraOpened(false);
    handleCameraPermissionDenied();
  };

  const addFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      addImageFromFile(event.target.files[0]);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setCameraOpened(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction="column">
          <Stack justifyContent="center" direction="row">
            {webcamLoading ? (
              <Box>
                <Typography>Connecting...</Typography>
                <LinearProgress />
              </Box>
            ) : null}
            <Box justifyContent="center">
              <Webcam
                height={300}
                width={300}
                ref={webcamRef}
                screenshotFormat="image/png"
                onUserMedia={closeConnectionProgressBar}
                className="webcam"
                scrolling="true"
                audio={false}
                videoConstraints={videoConstraints}
                onUserMediaError={handlePermissionDenied}
              />
            </Box>
          </Stack>
          <PhotoList images={images} removeImage={removeImage}></PhotoList>
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
                  onChange={(event) => addFromFile(event)}
                />
                <CollectionsIcon color="success" />
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
                onClick={() => setCameraOpened(false)}
              >
                <ClearIcon fontSize="large" color="disabled" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CustomWebcam;

import { Box, Button, ImageList, ImageListItem, Stack } from '@mui/material';
import { useContext } from 'react';
import { Box, ListItemButton, ListItemText, Stack } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import StateContext from '../../state/state.context';
import { Image } from '../add-offer-form';
import Camera from './camera';
import PhotoList from './photo-list';
import {useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


type ImageLoaderProps = {
  images: Image[];
  addImage: (event: any) => void;
  removeImage: (imageId: string) => void;
  addPhoto: (imageUrl: string) => void;
};
function ImageLoader({
  images,
  addImage,
  removeImage,
  addPhoto,
}: ImageLoaderProps) {
  const { setAlert } = useContext(StateContext);
  function unknownErrorOccured() {
    setAlert({
      type: 'error',
      message: 'Ein Fehler ist aufgetreten',
    });
  }
  return (
    <Box>
      <ErrorBoundary
          onError={() => unknownErrorOccured()}
          FallbackComponent={FallbackComponent}
      >
      {images.length <= 0 && !cameraOpened ? (
        <ListItemButton
          onClick={() => {
            setCameraOpened(() => true);
            console.log('camera opened called, cameraOpened: ', cameraOpened);
          }}
        >
          <Box marginRight={2}>
            <PhotoCamera color="primary" fontSize="small"></PhotoCamera>
          </Box>
          <ListItemText primary={'Foto hinzufügen'}></ListItemText>
          <Box>
            <ArrowForwardIosIcon
              color="primary"
              fontSize="small"
            ></ArrowForwardIosIcon>
          </Box>
        </ListItemButton>
      ) : (
        <Stack direction="column" m={1}>
            <Stack direction="column" alignItems="center" spacing={2}>
              <Camera
                addPhoto={addPhoto}
                addImageFromFile={addImage}
                images={images}
                removeImage={removeImage}
                setCameraOpened={setCameraOpened}
                cameraOpened={cameraOpened}
              />
            </Stack>
            <PhotoList images={images} removeImage={removeImage}></PhotoList>

        </Stack>
      )}
      </ErrorBoundary>
    </Box>
  );
}

export default ImageLoader;

function FallbackComponent() {
  return <></>;
}

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import {
  Button,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
} from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import { v4 as uuidv4 } from 'uuid';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

// Link base url to load images, image id added in functions uploadFile and getImages
const CDNURL =
  'https://sjnxrpazstalmggosrcy.supabase.co/storage/v1/object/public/images/admin/';

function ImageLoader({images, addImage, removeImage}) {

    // async function uploadImages(event: any): Promise<void> {
    //   const image = event?.target?.files[0];
    //   const { error } = await supabase.storage
    //     .from('images')
    //     .upload('admin/' + uuidv4, image);
    //   if (error) {
    //     console.log('error: ' + typeof error, error);
    //     alert('error: ' + error.error + ', ' + error.message);
    //   } else {
    //     console.log('images stored sucessfully')
    //   }
    // }

  //   async function getImages() {
  //     console.log('getImges called...');
  //     const { data, error } = await supabase.storage
  //       .from('images')
  //       .list('admin/', {
  //         limit: 20,
  //         offset: 0,
  //         sortBy: { column: 'name', order: 'asc' },
  //       });

  //     if (data !== null) {
  //       console.log('data', data);
  //       setImages(data);
  //     } else {
  //       alert('Error loading imgaes');
  //       console.log(error);
  //     }
  //   }

  //   useEffect(() => {
  //     getImages();
  //   }, []);

  //   async function deleteImage(name: string) {
  //     const { data, error } = await supabase.storage
  //       .from('images')
  //       .remove(['admin/' + name]);

  //     if (data !== null) {
  //       console.log('image deleted' + name + ', response: ', data);
  //       getImages();
  //     } else {
  //       alert('Error deleting imgage');
  //       console.log(error);
  //     }
  //   }



  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <ErrorBoundary
        onError={(error) => alert(error)}
        FallbackComponent={FallbackComponent}
      >
        <Stack direction="column" alignItems="center" spacing={2}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(event) => addImage(event)}
            />
            <PhotoCamera />
          </IconButton>
        </Stack>
        <ImageList sx={{ maxWidth: 200, maxHeight: 200 }} cols={1}>
          {images?.map((image) => (
            <ImageListItem key={image}>
              <img src={image} alt={image} loading="lazy" />
              <Button onClick={() => removeImage(image)}>Delete</Button>
            </ImageListItem>
          ))}
        </ImageList>
      </ErrorBoundary>
    </Container>
  );
}

export default ImageLoader;

function FallbackComponent() {
  return <>{alert('Error occured...')}</>;
}

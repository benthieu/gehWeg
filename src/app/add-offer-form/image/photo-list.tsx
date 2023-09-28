import {
  Button,
  ImageList,
  ImageListItem,
} from '@mui/material';
import { Stack } from '@mui/system';
import { Image } from '../add-offer-form';

type PhotoListProps = {
  images: Image[];
  removeImage: (imageId: string) => void;
};

export function PhotoList({
  images,
  removeImage,
}: PhotoListProps) {

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <ImageList sx={{ maxWidth: 300, maxHeight: 300 }} cols={3}>
        {images?.map((image) => (
          <ImageListItem key={image.imageId}>
            <img src={image.imageUrl} alt={image.imageUrl} loading="lazy" />
            <Button onClick={() => removeImage(image.imageId)}>
              Bild entfernen
            </Button>
          </ImageListItem>
        ))}
      </ImageList>
    </Stack>
  );
}

export default PhotoList;

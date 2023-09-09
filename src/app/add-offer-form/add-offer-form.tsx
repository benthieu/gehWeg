import ImageLoader from './image-loader';
import OfferTitle from './offer-title';
import OfferCategory from './offer-category';
import OfferDescription from './offer-description';
import OfferGeolocation from './offer-geolocation';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import { Tables } from '.././state/supabase/database.types';
import { v4 as uuidv4 } from 'uuid';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

type Image = {
  imageUrl: string;
  imageId: string;
};

export function AddOfferForm() {
  const [images, setImages] = useState<Image[]>([]);
  const [offer, setOffer] = useState<Tables<'Offer'>>();
  const supabase = useSupabaseClient();

  async function addImage(event: any) {
    console.log('images before add: ', images);
    const newImageUrl = URL.createObjectURL(event.target.files[0]);
    const image: Image = { imageUrl: newImageUrl, imageId: uuidv4() };
    await setImages((images) => [...images, image]);
    updateOffer(image.imageId);
  }

  function updateOffer(imageId: string) {
    console.log('Updating offer..', offer);
    console.log('images:', images);
    const imageIds = images.map((image) => image.imageId);
    const newOffer = { ...offer };
    newOffer.images
      ? (newOffer.images = [...imageIds, imageId])
      : (newOffer.images = [imageId]);
    setOffer((offer) => {
      return { ...offer, ...newOffer };
    });
    console.log('newOffer', newOffer);
  }

  async function removeImage(imageId: string) {
    console.log('images before remove: ', images);
    await setImages((images) =>
      images.filter((element) => {
        return element.imageId !== imageId;
      })
    );
    updateOffer(imageId);
  }

  async function getBlobFromUrl(url: string) {
    return fetch(url).then((r) => r.blob());
  }

  async function uploadImages(images: string[]): Promise<void> {
    images.forEach((imageUrl) => {
      const image = getBlobFromUrl(imageUrl);
      image.then((image) => storeImage(image));
    });
  }

  const storeImage = async function (image: Blob) {
    const imageId = uuidv4();
    const { error } = await supabase.storage
      .from('images')
      .upload('admin/' + imageId, image);
    if (error) {
      console.log('error: ' + typeof error, error);
      alert('error: ' + error.error + ', ' + error.message);
    } else {
      alert('image stored');
    }
  };

  function updateTitle(title: any) {
    console.log('offer before update title: ', offer);
    console.log('event: ', title);

    const newOffer = { ...offer, subject: title };
    console.log('new offer to update title: ', newOffer);
    setOffer((prevOffer) => {
      return { ...prevOffer, ...newOffer };
    });
    console.log('updated title: offer:', offer);
  }

  function updateDescription(description: any) {
    console.log('offer before update description: ', offer);
    console.log('event: ', description);

    const newOffer = { ...offer, description: description };
    console.log('new offer to update title: ', newOffer);
    setOffer((prevOffer) => {
      return { ...prevOffer, ...newOffer };
    });
    console.log('updated description: offer:', offer);
  }

  async function saveOffer() {
    await uploadImages(images);

    const offerToBeSaved = buildOffer();

    const { error } = await supabase
      .from('Offer')
      .insert({ ...offerToBeSaved });
  }

  function buildOffer() {
    return { ...offer, created_by: 1, status: 'new' };
  }

  return (
    <>
      <div className="header">
        <h3>Angebot erfassen</h3>
      </div>

      <ImageLoader
        images={images}
        addImage={addImage}
        removeImage={removeImage}
      />
      <OfferTitle title={''} updateTitle={updateTitle} />
      <OfferDescription
        description={''}
        updateDescription={updateDescription}
      />
      <OfferCategory categories={[]} />
      <OfferGeolocation title={''} />
      <Button
        onClick={saveOffer}
        color="primary"
        variant="contained"
        disabled={!offer?.subject}
      >
        Speichern
      </Button>
      <Button
        onClick={() => {
          console.log('images: ', images);
          console.log('offer', offer);
        }}
      >
        Log images
      </Button>
    </>

    // <>
    //   <div className="header">
    //     <h3>Angebot erfassen</h3>
    //   </div>
    //   <Grid
    //     container
    //     direction="column"
    //     alignItems="center"
    //     justifyContent="center"
    //   >
    //     <Grid item xs={3}>
    //       <ImageLoader
    //         images={images}
    //         addImage={addImage}
    //         removeImage={removeImage}
    //       />
    //     </Grid>
    //     <Grid item xs={3}>
    //       <OfferTitle title={''} updateTitle={updateTitle} />
    //     </Grid>
    //     <Grid item xs={3}>
    //       <OfferDescription
    //         description={''}
    //         updateDescription={updateDescription}
    //       />
    //     </Grid>
    //     <Grid item xs={3}>
    //       <OfferCategory categories={[]} />
    //     </Grid>
    //     <Grid item xs={3}>
    //       <OfferGeolocation title={''} />
    //     </Grid>
    //     <Grid mb={1}>
    //       <Button onClick={saveOffer}>Speichern</Button>
    //     </Grid>
    //   </Grid>
    // </>
  );
}
function useForm(): { register: any; handleSubmit: any; errors: any } {
  throw new Error('Function not implemented.');
}

import { Box, Button } from '@mui/material';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Tables } from '.././state/supabase/database.types';
import StateContext from '../state/state.context';
import ImageLoader from './image-loader';
import OfferCategory from './offer-category';
import OfferDescription from './offer-description';
import OfferGeolocation from './offer-geolocation';
import OfferTitle from './offer-title';

export interface Image {
  imageUrl: string;
  imageId: string;
}

export function AddOfferForm() {
  const { activeUser } = useContext(StateContext);
  const [images, setImages] = useState<Image[]>([]);
  const [offer, setOffer] = useState<Partial<Tables<'Offer'>>>({
    category: null,
    city: null,
    created_by: activeUser ? activeUser.id : 1,
    description: null,
    location: null,
    postal_code: null,
    status: '',
    street: null,
    subject: '',
    images: null,
  });
  const supabase = useSupabaseClient();

  useEffect(() => updateOffer(), [images]);

  function updateOffer() {
    const imageIds = images.map((image) => image.imageId);
    const newOffer = {
      ...offer,
      images: imageIds,
    };
    setOffer((offer) => {
      return { ...offer, ...newOffer };
    });
  }

  function addImage(event: any) {
    const newImageUrl = URL.createObjectURL(event.target.files[0]);
    const image: Image = { imageUrl: newImageUrl, imageId: uuidv4() };
    setImages((images) => [...images, image]);
  }

  async function removeImage(imageId: string) {
    await setImages((images) =>
      images.filter((element) => {
        return element.imageId !== imageId;
      })
    );
  }

  function saveImages(images: string[]) {
    images.forEach((imageUrl) => {
      fetch(imageUrl)
        .then((r) => {
          console.log('fetched from imageUrl: ', r);
          return r.blob();
        })
        .then((image) => storeImagesToSupabase(image));
    });
  }

  const storeImagesToSupabase = async function (image: Blob) {
    console.log('image file', image);
    const imageId = uuidv4();
    const { error } = await supabase.storage
      .from('images')
      .upload('admin/' + imageId, image);
    if (error) {
      console.log('error: ' + typeof error, error);
      alert('error: ' + error + ', ' + error.message);
    } else {
      console.log('image saved: ', imageId);
    }
  };

  function updateTitle(title: string) {
    const newOffer = {
      ...offer,
      subject: title,
    };
    setOffer((prevOffer) => {
      return { ...prevOffer, ...newOffer };
    });
    console.log('Updated title. Offer: ', offer);
  }

  function updateDescription(description: string) {
    const newOffer = {
      ...offer,
      description: description,
    };
    setOffer((prevOffer) => {
      return { ...prevOffer, ...newOffer };
    });
    console.log('Updated description. Offer: ', offer);
  }

  async function saveOffer() {
    await saveImages(images.map((image) => image.imageUrl));
    const offerToBeSaved = buildOffer();
    const { error } = await supabase
      .from('Offer')
      .insert({ ...offerToBeSaved });

    if (error) {
      alert('error occured: ' + error);
    }
    console.log('Offer saved: ', offer);
    alert('Angebot gespeichert');
  }

  function buildOffer() {
    return {
      ...offer,
      created_by: activeUser?.id,
      status: 'new'
    };
  }

  return (
    <>
      <Box m={2}>
        <div className="header">
          <h3>Etwas auf den Gehweg stellen</h3>
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
      </Box>
      <Box m={2} justifyContent="center" display="flex">
        <Button
          onClick={saveOffer}
          color="primary"
          variant="contained"
          disabled={!offer?.subject}
        >
          Speichern
        </Button>
      </Box>
    </>
  );
}

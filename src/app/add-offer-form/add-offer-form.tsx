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
  const { activeUser, categories, currentLocation, defaultLocation } =
    useContext(StateContext);
  const [images, setImages] = useState<Image[]>([]);
  const [offer, setOffer] = useState<Partial<Tables<'Offer'>>>({
    category: null,
    city: null,
    created_by: activeUser ? activeUser.id : 1,
    description: null,
    location: currentLocation,
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
      images: imageIds
    };
    setOffer((offer) => {
      return { ...offer, ...newOffer };
    });
  }

  function addImage(event: { target: { files: (Blob | MediaSource)[] } }) {
    const newImageUrl = URL.createObjectURL(event.target.files[0]);
    const image: Image = { imageUrl: newImageUrl, imageId: uuidv4() };
    setImages((images) => [...images, image]);
  }

  function removeImage(imageId: string) {
    setImages((images) =>
      images.filter((element) => {
        return element.imageId !== imageId;
      })
    );
  }

  function saveImages(images: string[]) {
    images.forEach((imageUrl) => {
      fetch(imageUrl)
        .then((r) => {
          return r.blob();
        })
        .then((image) => storeImagesToSupabase(image));
    });
  }

  const storeImagesToSupabase = async function (image: Blob) {
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

  function updateCategory(category: string) {
    const newOffer = { ...offer, category: category };
    setOffer((previousOffer) => {
      return { ...previousOffer, ...newOffer };
    });
  }

  async function saveOffer() {
    saveImages(images.map((image) => image.imageUrl));
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
      status: 'new',
    };
  }

  function setOfferLocation(e: { latlng: { lat: number; lng: number } }) {
    console.log('setOfferLoaction called. input: ', e);
    const newLocation = { lat: e.latlng.lat, lng: e.latlng.lng };
    setOffer({ ...offer, location: newLocation });
  }

  return (
    <>
      <div className="header">
        <h3>Angebot erstellen</h3>
      </div>
      <Box m={2}>
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
        <OfferCategory
          categories={categories.map((c) => c.name)}
          updateCategory={updateCategory}
        />
        <OfferGeolocation
          location={offer.location ? offer.location : defaultLocation}
          handleClickOnMap={setOfferLocation}
        />
        <Button
          onClick={saveOffer}
          color="primary"
          variant="contained"
          disabled={!offer.subject}
        >
          Speichern
        </Button>
      </Box>
    </>
  );
}

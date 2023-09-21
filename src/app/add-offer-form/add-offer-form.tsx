import { Box, Button } from '@mui/material';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { LatLngLiteral } from 'leaflet';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Tables } from '.././state/supabase/database.types';
import StateContext from '../state/state.context';

import OfferCategory from './offer-category';
import OfferDescription from './offer-description';
import OfferGeolocation from './offer-geolocation';
import OfferTitle from './offer-title';
import ImageLoader from './image/image-loader';

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
      images: imageIds,
    };
    setOffer((offer) => {
      return { ...offer, ...newOffer };
    });
  }

  function addImageFromFile(event: {
    target: { files: (Blob | MediaSource)[] };
  }) {
    const newImageUrl = URL.createObjectURL(event.target.files[0]);
    addImageFromUrl(newImageUrl);
  }

  function addImageFromUrl(newImageUrl: string) {
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

  function saveImages(images: Image[]) {
    images.forEach((image) => {
      fetch(image.imageUrl)
        .then((r) => {
          return r.blob();
        })
        .then((imageBlob) => storeImagesToSupabase(imageBlob, image.imageId));
    });
  }

  const storeImagesToSupabase = async function (
    imageBlob: Blob,
    imageId: string
  ) {
    const { error } = await supabase.storage
      .from('images')
      .upload('admin/' + imageId, imageBlob);
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
    saveImages(images);
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
    const location = offer.location as LatLngLiteral;
    const point = `POINT(${location.lat} ${location.lng})`;
    return {
      ...offer,
      created_by: activeUser?.id,
      status: 'new',
      location: point,
    };
  }

  /**
   *
   * @param address is in the format: street, PLZ city, country
   */
  function setOfferLocation(
    e: { latlng: { lat: number; lng: number } },
    address: string
  ) {
    const newLocation = { lat: e.latlng.lat, lng: e.latlng.lng };
    const addressParts: string[] = address.split(',');

    const offerCity = addressParts[1].split(' ')[2];
    const offerPLZ = parseInt(addressParts[1].split(' ')[1]);
    const offerStreet = addressParts[0];

    console.log(`PLZ: ${offerPLZ}, street: ${offerStreet}, city: ${offerCity}`);

    setOffer({
      ...offer,
      city: offerCity,
      postal_code: offerPLZ,
      street: offerStreet,
      location: newLocation,
    });
  }

  return (
    <>
      <div className="header">
        <h3>Angebot erstellen</h3>
      </div>
      <Box m={1}>
        <OfferTitle title={''} updateTitle={updateTitle} />
        <ImageLoader
          images={images}
          addImage={addImageFromFile}
          removeImage={removeImage}
          addPhoto={addImageFromUrl}
        />
        <OfferDescription
          description={''}
          updateDescription={updateDescription}
        />
        <OfferGeolocation
          location={
            offer.location ? (offer.location as LatLngLiteral) : defaultLocation
          }
          handleClickOnMap={setOfferLocation}
        />
        <OfferCategory
          categories={categories.map((c) => c.name)}
          updateCategory={updateCategory}
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

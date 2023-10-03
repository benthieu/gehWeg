import { Box, Button, Divider, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { LatLngLiteral } from 'leaflet';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { Tables } from '.././state/supabase/database.types';
import StateContext from '../state/state.context';
import AddOfferCategory from './category/add-category';
import AddDescriptionButton from './description/add-description-button';
import AddGeolocationButton from './geolocation/add-geolocation-button';
import AddPhotoButton from './image/add-photo-button';
import AddOfferTitle from './title/add-offer-title';

export interface Image {
  imageUrl: string;
  imageId: string;
}

export function AddOfferForm() {
  const { activeUser, categories, currentLocation, defaultLocation, setAlert } =
    useContext(StateContext);
  const navigate = useNavigate();
  const [images, setImages] = useState<Image[]>([]);
  const [offer, setOffer] = useState<Partial<Tables<'Offer'>>>({
    category: null,
    city: '',
    created_by: activeUser ? activeUser.id : 1,
    description: null,
    location: currentLocation,
    postal_code: null,
    status: '',
    street: '',
    subject: '',
    images: null,
  });
  const supabase = useSupabaseClient();

  useEffect(() => updateOffer(), [images]);

  function updateOffer() {
    const imageIds = images.map((image) => image.imageId);
    setOffer({
      ...offer,
      images: imageIds,
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
      setAlert({
        type: 'error',
        message:
          'Fehler beim Hochladen der Bilder, versuchen Sie es später erneut',
      });
    }
  };

  function updateTitle(title: string) {
    setOffer({
      ...offer,
      subject: title,
    });
  }

  function updateDescription(description: string) {
    setOffer({
      ...offer,
      description: description,
    });
  }

  function updateCategory(category: number) {
    setOffer({ ...offer, category: category });
  }

  async function saveOffer() {
    saveImages(images);
    const offerToBeSaved = buildOffer();
    if (!offerToBeSaved) {
      return;
    }
    const { error } = await supabase
      .from('Offer')
      .insert({ ...offerToBeSaved });
    if (error) {
      setAlert({
        type: 'error',
        message: 'Das Angebot konnte leider nicht gespeichert werden',
      });
      return;
    }
    setAlert({
      type: 'success',
      message: 'Das Angebot wurde gespeichert',
    });
    navigate('/');
  }

  function buildOffer() {
    try {
      const location = offer.location as LatLngLiteral;
      const point = `POINT(${location.lat} ${location.lng})`;
      return {
        ...offer,
        created_by: activeUser?.id,
        status: 'new',
        location: point,
      };
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Bitte Ort des Angebots angeben',
      });
    }
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

    setOffer({
      ...offer,
      city: offerCity,
      postal_code: offerPLZ,
      street: offerStreet,
      location: newLocation,
    });
  }

  function setDate(event: Date | null) {
    if (event) {
    setOffer({...offer, created_at: event.toLocaleDateString()})
    } else {
      setAlert({
        type: 'error',
        message: 'Fehler beim Setzen des Datums',
      });
    }
  }

  return (
    <>
      <div className="header">
        <h3>Angebot erstellen</h3>
      </div>
      <AddOfferTitle title={''} updateTitle={updateTitle} />
      <Divider />
      <AddOfferCategory
        categories={categories}
        updateCategory={updateCategory}
      />
      <Divider />
      <Box m={2}>
        <DatePicker label="Datum hinzufügen" 
        value={new Date()}
        onChange={(event) => setDate(event)}/>
      </Box>
      <Divider />
      <Box m={1}>
        <AddPhotoButton
          images={images}
          addImage={addImageFromFile}
          removeImage={removeImage}
          addPhoto={addImageFromUrl}
        />
        <AddDescriptionButton
          offer={offer}
          updateDescription={updateDescription}
        ></AddDescriptionButton>
        <AddGeolocationButton
          offer={offer}
          setOfferLocation={setOfferLocation}
          defaultLocation={defaultLocation}
        ></AddGeolocationButton>
        <Box m={2}>
          <Stack direction={'row'} spacing={3}>
            <Button
              onClick={saveOffer}
              color="primary"
              variant="contained"
              disabled={!offer.subject}
            >
              Speichern
            </Button>
            <Button
              onClick={() => navigate('/')}
              color="primary"
              variant="contained"
            >
              Abbrechen
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

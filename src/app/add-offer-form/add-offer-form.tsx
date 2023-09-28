import {
  Box,
  Button,
  ListItemButton,
  ListItemText,
  Divider,
  Stack,
} from '@mui/material';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { LatLngLiteral } from 'leaflet';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Tables } from '.././state/supabase/database.types';
import StateContext from '../state/state.context';
import OfferCategory from './offer-category';
import OfferTitle from './offer-title';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlaceIcon from '@mui/icons-material/Place';
import ImageLoader from './image/image-loader';
import OfferGeolocationModal from './geolocation/offer-geolocation-modal';
import { useNavigate } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import OfferDescriptionModal from './description/offer-description-modal';
import DoneIcon from '@mui/icons-material/Done';

export interface Image {
  imageUrl: string;
  imageId: string;
}

export function AddOfferForm() {
  const { activeUser, categories, currentLocation, defaultLocation, setAlert } = useContext(StateContext);
  const navigate = useNavigate();
  const [images, setImages] = useState<Image[]>([]);
  const [clickedOnAddGeolocation, setClickedOnAddGeolocation] = useState(false);
  const [clickedOnAddDescription, setClickedOnAddDescription] = useState(false);

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
      setAlert({
        type: 'error',
        message: 'Fehler beim Hochladen der Bilder, versuchen Sie es später erneut',
      });
    } else {
      console.log('Image(s) saved to backend.')
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

  function updateCategory(category: number) {
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
      <OfferTitle title={''} updateTitle={updateTitle} />
      <Divider />
      <OfferCategory
        categories={categories}
        updateCategory={updateCategory}
      />
      <Divider />
      <Box m={1}>
        <ImageLoader
          images={images}
          addImage={addImageFromFile}
          removeImage={removeImage}
          addPhoto={addImageFromUrl}
        />
        <Divider />
        {clickedOnAddDescription ? (
          <OfferDescriptionModal
            updateDescription={updateDescription}
            description={offer.description ? offer.description : ''}
            addDescriptionClosed={() => setClickedOnAddDescription(false)}
          />
        ) : null}
        <ListItemButton
          onClick={() => {
            setClickedOnAddDescription(true);
          }}
        >
          <Box marginRight={2}>
            <EditIcon color="primary" fontSize="small"></EditIcon>
          </Box>
          <ListItemText
            primary={
              offer.description ? `Beschreibung` : 'Beschreibung hinzufügen'
            }
            secondary={offer.description ? `${offer.description}` : ''}
            sx={{ width: `20px` }}
          ></ListItemText>
          <Box>
            {offer.description ? (
              <DoneIcon color="success" fontSize="medium" />
            ) : (
              <ArrowForwardIosIcon
                color="primary"
                fontSize="small"
              ></ArrowForwardIosIcon>
            )}
          </Box>
        </ListItemButton>
        <Divider />
        {clickedOnAddGeolocation ? (
          <OfferGeolocationModal
            location={
              offer.location
                ? (offer.location as LatLngLiteral)
                : defaultLocation
            }
            handleClickOnMap={setOfferLocation}
            addGeolocationClosed={() => setClickedOnAddGeolocation(false)}
          />
        ) : null}
        <ListItemButton onClick={() => setClickedOnAddGeolocation(true)}>
          <Box marginRight={2}>
            <PlaceIcon color="primary" fontSize="small"></PlaceIcon>
          </Box>
          <ListItemText
            primary={
              offer.street
                ? `${offer.street}, ${
                    offer.postal_code ? offer.postal_code : ''
                  } ${offer.city}`
                : 'Ort hinzufügen'
            }
            secondary={offer.street ? 'Klicken um Ort zu ändern' : ''}
          ></ListItemText>
          <Box>
            {offer.street ? (
              <DoneIcon color="success" fontSize="medium" />
            ) : (
              <ArrowForwardIosIcon
                color="primary"
                fontSize="small"
              ></ArrowForwardIosIcon>
            )}
          </Box>
        </ListItemButton>
        <Divider />
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

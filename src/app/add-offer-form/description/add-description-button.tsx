import { useState } from 'react';
import { Box, Divider, ListItemButton, ListItemText } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { Tables } from 'src/app/state/supabase/database.types';
import OfferDescriptionModal from './offer-description-modal';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type AddDescriptionButtonProps = {
  offer: Partial<Tables<'Offer'>>;
  updateDescription: (value: string) => void
};
function AddDescriptionButton({ offer, updateDescription }: AddDescriptionButtonProps) {
  const [descriptionModalOpened, setDescriptionModalOpened] = useState(false);

  return (
    <>
      {descriptionModalOpened ? (
        <OfferDescriptionModal
          updateDescription={updateDescription}
          description={offer.description ? offer.description : ''}
          addDescriptionClosed={() => setDescriptionModalOpened(false)}
        />
      ) : null}
      <ListItemButton
        onClick={() => {
          setDescriptionModalOpened(true);
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
    </>
  );
}

export default AddDescriptionButton;

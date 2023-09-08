import {
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  TextField,
} from '@mui/material';

type OfferDescriptionProps = {
  description: string;
  updateDescription: (description: string) => void;
};

export function OfferDescription({
  description,
  updateDescription,
}: OfferDescriptionProps) {
  return (
    <>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton>
          <ListItemText primary={'Beschreibung'}></ListItemText>
          <TextField
            id="offer-description"
            label="Titel"
            variant="outlined"
            onChange={(event) => {
              updateDescription(event.target.value);
            }}
          />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
}

export default OfferDescription;

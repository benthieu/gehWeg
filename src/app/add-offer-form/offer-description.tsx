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
            multiline
            id="offer-description"
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

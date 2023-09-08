import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  TextField,
} from '@mui/material';

type OfferTitleProps = {
  title: string;
  updateTitle: (title: any) => void;
};

export function OfferTitle({ title, updateTitle }: OfferTitleProps) {
  return (
    <>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton>
          <ListItemText primary={'Titel'}></ListItemText>
          <TextField
            id="offer-title"
            label="Titel"
            variant="outlined"
            onChange={(event) => {
              updateTitle(event.target.value);
            }}
          />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
}

export default OfferTitle;

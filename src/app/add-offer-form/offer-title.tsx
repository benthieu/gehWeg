import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  TextField,
  Stack,
  Box,
} from '@mui/material';
import { useState } from 'react';

type OfferTitleProps = {
  title: string;
  updateTitle: (title: any) => void;
};

export function OfferTitle({ title, updateTitle }: OfferTitleProps) {
  // Variable zur Umsetzung der Input-Validierung: Wert muss vorhanden sein
  const [value, setValue] = useState('');
  return (
    <Box mx={1}>
      <Stack direction="column" m={1}>
        <Typography variant="h6" mx={1}>
          Titel
        </Typography>
        <TextField
          type="text"
          required
          id="offer-title"
          variant="standard"
          error={!value}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            updateTitle(event.target.value);
          }}
          helperText={!value ? 'Bitte Titel eingeben' : ''}
        />
      </Stack>
    </Box>
  );
}

export default OfferTitle;

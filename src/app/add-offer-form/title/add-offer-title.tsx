import { Box, Stack, TextField } from '@mui/material';
import { useState } from 'react';

type AddOfferTitleProps = {
  updateTitle: (title: string) => void;
};

export function AddOfferTitle({ updateTitle }: AddOfferTitleProps) {
  const [value, setValue] = useState('');

  return (
    <Box mx={1}>
      <Stack direction="column" m={1}>
        <TextField
          color="primary"
          type="text"
          placeholder="Titel"
          required
          id="offer-title"
          variant="standard"
          error={!value}
          value={value}
          onBlur={(event) => updateTitle(event.target.value)}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          helperText={!value ? 'Pflichtfeld' : ''}
        />
      </Stack>
    </Box>
  );
}

export default AddOfferTitle;

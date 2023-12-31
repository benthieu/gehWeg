import { Box, Stack, TextField } from '@mui/material';
import { useState } from 'react';

type OfferTitleProps = {
  updateTitle: (title: string) => void;
};

export function FilterTitle({ updateTitle }: OfferTitleProps) {
  const [value, setValue] = useState('');

  return (
    <Box mx={1}>
      <Stack direction="column" m={1}>
        <TextField
          label="Textsuche"
          type="text"
          required
          id="filter-title"
          variant="standard"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            updateTitle(event.target.value);
          }}
        />
      </Stack>
    </Box>
  );
}

export default FilterTitle;

import { TextField, Stack, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

type AddOfferTitleProps = {
  title: string;
  updateTitle: (title: string) => void;
};

export function AddOfferTitle({ title, updateTitle }: AddOfferTitleProps) {

  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 800);

  useEffect(() => updateTitle(value), [debouncedValue]);

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

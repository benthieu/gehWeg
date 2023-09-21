import {
  TextField,
  Stack,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-lodash-debounce'; // Types seem not to exist


type OfferTitleProps = {
  title: string;
  updateTitle: (title: any) => void;
};

export function OfferTitle({ title, updateTitle }: OfferTitleProps) {
  // Variable zur Umsetzung der Input-Validierung: Wert muss vorhanden sein
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 800);

  useEffect(() => updateTitle(value as string), [debouncedValue]);
  
  return (
    <Box mx={1}>
      <Stack direction="column" m={1}>
        <TextField
          type="text"
          placeholder='Titel'
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

export default OfferTitle;

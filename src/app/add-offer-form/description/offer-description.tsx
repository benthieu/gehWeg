import { TextField, Box, Stack, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-lodash-debounce'; // Types seem not to exist

type OfferDescriptionProps = {
  description: string;
  updateDescription: (description: string) => void;
};

export function OfferDescription({ updateDescription }: OfferDescriptionProps) {
  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, 800);

  useEffect(() => updateDescription(value as string), [debouncedValue]);

  return (
    <Box mx={1}>
      <Stack direction="column" m={1} mt={3}>
        <Tooltip title="Beschreibung eingeben">
          <TextField
            label="Beschreibung"
            type="text"
            id="offer-title"
            multiline
            variant="outlined"
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        </Tooltip>
      </Stack>
    </Box>
  );
}

export default OfferDescription;

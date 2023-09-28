import {Box, Stack, TextField,} from '@mui/material';
import {useState} from 'react';

type OfferTitleProps = {
  title: string;
  updateTitle: (title: any) => void;
};

export function FilterTitle({ title, updateTitle }: OfferTitleProps) {
  const [value, setValue] = useState('');

  return (
    <Box mx={1}>
      <Stack direction="column" m={1}>
        <TextField
          label="Title"
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

import {Box, MenuItem, Stack, TextField} from '@mui/material';
import {useState} from 'react';

type OfferCategoryProps = {
  categories: string[];
  updateCategory: (category: string) => void;
};

export function OfferCategory({categories, updateCategory}: OfferCategoryProps) {

  const [category, setCategory] = useState('');

  return (
    <Box mx={1}>
      <Stack direction="column" m={1}>
        <TextField
          id="offer-category"
          label='Kategorie wählen'
          select
          variant="standard"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            updateCategory(event.target.value);
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </Box>
  );
}

export default OfferCategory;

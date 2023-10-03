import { Box, MenuItem, Stack, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { Tables } from '../../state/supabase/database.types';

type AddOfferCategoryProps = {
  categories: Tables<'Category'>[];
  updateCategory: (category: string) => void;
};

export function AddOfferCategory({
  categories,
  updateCategory,
}: AddOfferCategoryProps) {
  const [category, setCategory] = useState('');

  return (
    <Box mx={1}>
      <Stack direction="column" m={1}>
        <Tooltip title="Kategorie wählen">
        <TextField
          id="offer-category"
          label="Kategorie"
          select
          variant="standard"
          value={category}
          onChange={(event) => {
            const value = event.target.value;
            setCategory(value);
            updateCategory(value);
          }}
        >    
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        </Tooltip>
      </Stack>
    </Box>
  );
}

export default AddOfferCategory;

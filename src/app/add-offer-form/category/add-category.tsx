import { Box, MenuItem, Stack, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { Tables } from '../../state/supabase/database.types';

type AddOfferCategoryProps = {
  categories: Tables<'Category'>[];
  updateCategory: (category: number) => void;
};

export function AddOfferCategory({
  categories,
  updateCategory,
}: AddOfferCategoryProps) {
  const [category, setCategory] = useState(0);

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
              const value = parseInt(event.target.value);
              setCategory(value);
              updateCategory(value);
            }}
          >
            <MenuItem key={0} value={0}>
              Kategorie auswählen
            </MenuItem>
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
